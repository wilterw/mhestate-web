FROM php:8.2-apache

# Habilitar mod_rewrite
RUN a2enmod rewrite

# Copiar archivos
COPY . /var/www/html/

# --- CORRECCIÓN DE PERMISOS PROFESIONAL ---
# 1. Dueño: www-data (Apache)
RUN chown -R www-data:www-data /var/www/html/

# 2. Permisos: Carpetas 755, Archivos 644 (Estándar Linux Web)
# Esto evita errores 403 Forbidden por permisos incorrectos
RUN find /var/www/html/ -type d -exec chmod 755 {} \;
RUN find /var/www/html/ -type f -exec chmod 644 {} \;

# 3. Excepción para carpeta de datos (Escritura total)
RUN mkdir -p /var/www/html/assets/data && chmod -R 777 /var/www/html/assets/data

EXPOSE 80