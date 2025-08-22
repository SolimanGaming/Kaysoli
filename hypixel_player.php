<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$apiKey = "4f0bdb4c-572c-4571-b5b3-4906063bcfd8"; // Replace with your Hypixel API key
$uuid = "ae24c7c71f4442c2aa406d218e6c1d8c";

if (!$uuid) {
    echo json_encode(["error" => "No UUID provided"]);
    exit;
}

$url = "https://api.hypixel.net/player?key={$apiKey}&uuid={$uuid}";
$response = file_get_contents($url);
echo $response;
