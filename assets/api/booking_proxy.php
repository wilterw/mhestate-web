<?php
/**
 * BOOKING PROXY (MOCK DATA - 12 ITEMS / 3 PAGINAS)
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$mockData = [
    ["id"=>"1", "category"=>"holiday", "name"=>"Villa Paraíso", "city"=>"Nerja", "price"=>1500, "m2"=>120, "beds"=>3, "baths"=>2, "features"=>["pool", "wifi"], "image"=>"assets/img/hero-bg.jpg", "link"=>"#"],
    ["id"=>"2", "category"=>"long_term", "name"=>"Apartamento Centro", "city"=>"Torrox", "price"=>850, "m2"=>80, "beds"=>2, "baths"=>1, "features"=>["terrace"], "image"=>"assets/img/hero-bg1.jpg", "link"=>"contact.html"],
    ["id"=>"3", "category"=>"holiday", "name"=>"Sunny Beach House", "city"=>"Marbella", "price"=>2200, "m2"=>200, "beds"=>4, "baths"=>3, "features"=>["pool", "garage", "ac"], "image"=>"assets/img/cta-bg.jpg", "link"=>"#"],
    ["id"=>"4", "category"=>"long_term", "name"=>"Townhouse Modern", "city"=>"Nerja", "price"=>1200, "m2"=>150, "beds"=>3, "baths"=>2, "features"=>["garage"], "image"=>"assets/img/sell-hero-bg.jpg", "link"=>"contact.html"],
    ["id"=>"5", "category"=>"holiday", "name"=>"Cozy Studio", "city"=>"Torrox", "price"=>400, "m2"=>45, "beds"=>1, "baths"=>1, "features"=>["wifi"], "image"=>"assets/img/hero-bg.jpg", "link"=>"#"],
    // PAGINA 2
    ["id"=>"6", "category"=>"holiday", "name"=>"Luxury Penthouse", "city"=>"Marbella", "price"=>3000, "m2"=>180, "beds"=>3, "baths"=>3, "features"=>["pool", "terrace", "wifi"], "image"=>"assets/img/mhestate 2.jpg", "link"=>"#"],
    ["id"=>"7", "category"=>"long_term", "name"=>"Family Home", "city"=>"Nerja", "price"=>1100, "m2"=>130, "beds"=>3, "baths"=>2, "features"=>["garage"], "image"=>"assets/img/hero-bg1.jpg", "link"=>"contact.html"],
    ["id"=>"8", "category"=>"holiday", "name"=>"Mountain Retreat", "city"=>"Frigiliana", "price"=>900, "m2"=>100, "beds"=>2, "baths"=>1, "features"=>["pool"], "image"=>"assets/img/cta-bg.jpg", "link"=>"#"],
    ["id"=>"9", "category"=>"long_term", "name"=>"Urban Flat", "city"=>"Málaga", "price"=>950, "m2"=>75, "beds"=>2, "baths"=>1, "features"=>["wifi"], "image"=>"assets/img/hero-bg.jpg", "link"=>"contact.html"],
    ["id"=>"10", "category"=>"holiday", "name"=>"Sea View Villa", "city"=>"Nerja", "price"=>2500, "m2"=>200, "beds"=>4, "baths"=>3, "features"=>["pool", "garage"], "image"=>"assets/img/sell-hero-bg.jpg", "link"=>"#"],
    // PAGINA 3
    ["id"=>"11", "category"=>"holiday", "name"=>"Beachfront Apt", "city"=>"Torrox", "price"=>1800, "m2"=>90, "beds"=>2, "baths"=>2, "features"=>["terrace", "wifi"], "image"=>"assets/img/hero-bg.jpg", "link"=>"#"],
    ["id"=>"12", "category"=>"long_term", "name"=>"Country House", "city"=>"Frigiliana", "price"=>1300, "m2"=>160, "beds"=>3, "baths"=>2, "features"=>["pool", "garden"], "image"=>"assets/img/hero-bg1.jpg", "link"=>"contact.html"]
];

echo json_encode(["status" => "success", "data" => $mockData]);
?>