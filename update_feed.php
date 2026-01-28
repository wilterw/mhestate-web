<?php
header('Content-Type: application/json');

// 1. CONFIGURACIÓN
$api_secret = "**@W16122002www!!!"; 
$target_dir = __DIR__ . '/assets/data/'; // Ruta absoluta a la carpeta
$target_file = $target_dir . 'propiedades.xml';

// 2. VERIFICACIÓN DE TOKEN
$token = isset($_SERVER['HTTP_X_AUTH_TOKEN']) ? $_SERVER['HTTP_X_AUTH_TOKEN'] : '';
if ($token !== $api_secret) {
    http_response_code(403);
    die(json_encode(["status" => "error", "message" => "Acceso denegado: Token incorrecto"]));
}

// 3. VERIFICACIÓN DE PERMISOS (DEBUG)
// Si la carpeta no existe, intentamos crearla
if (!file_exists($target_dir)) {
    if (!mkdir($target_dir, 0755, true)) {
        http_response_code(500);
        die(json_encode(["status" => "error", "message" => "La carpeta 'assets/data' no existe y no se pudo crear."]));
    }
}

// Verificamos si podemos escribir
if (!is_writable($target_dir)) {
    http_response_code(500);
    // Intentamos cambiar permisos al vuelo (a veces funciona si el usuario es el mismo)
    @chmod($target_dir, 0777); 
    if (!is_writable($target_dir)) {
        die(json_encode([
            "status" => "error", 
            "message" => "PERMISOS DENEGADOS: El servidor no puede escribir en " . $target_dir . ". Necesitas ejecutar 'chmod 777 assets/data' en la consola."
        ]));
    }
}

// 4. OBTENER Y GUARDAR DATOS
$xml_content = file_get_contents('php://input');

if (empty($xml_content) || strlen($xml_content) < 10) {
    http_response_code(400);
    die(json_encode(["status" => "error", "message" => "XML vacío o inválido"]));
}

if (file_put_contents($target_file, $xml_content)) {
    echo json_encode([
        "status" => "success", 
        "message" => "Archivo actualizado correctamente", 
        "path" => $target_file,
        "bytes" => strlen($xml_content)
    ]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Fallo al escribir en el disco."]);
}
?>