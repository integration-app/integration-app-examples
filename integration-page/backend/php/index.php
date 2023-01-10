<?php
require "vendor/autoload.php";

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");

// Generating a token to access Integration.app API on behalf of your User

// Your workspace key and secret.
// You can find them on the Settings page.
$secret = '53b126ea9ae102e196e41a95cbd71875dcada551b01c342cfc3ccca26c0c09fd';
$key = '18518337-13d4-4a8a-8906-5c07fac10d2e';

$payload = [
    'id' => "test@integration.app",  // Identifier of user or organization.
    'name' => "Test User", // Human-readable name (it will simplify troubleshooting)
    // 'fields' => .... (optional) Any user fields you want to attach to your user.
    'iss' => $key,
    'exp' => date(strtotime('+4 hours')), // To prevent token from being used for too long
];
echo json_encode(JWT::encode($payload, $secret, 'HS256'));

