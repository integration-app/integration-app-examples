<?php
require "vendor/autoload.php";

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");

// Generating a token to access Integration.app API on behalf of your User

// Your workspace key and secret.
// You can find them on the Settings page.
$secret = '{WORKSPACE_SECRET}';
$key = '{WORKSPACE_KEY}';

$payload = [
    'id' => "{USER_ID}",  // Identifier of user or organization.
    'name' => "{USER_NAME}", // Human-readable name (it will simplify troubleshooting)
    //TODO: Fields Example
    // 'fields' => .... (optional) Any user fields you want to attach to your user.
    'iss' => $key,
    'exp' => date(strtotime('+4 hours')), // To prevent token from being used for too long
];
echo json_encode(JWT::encode($payload, $secret, 'HS256'));

