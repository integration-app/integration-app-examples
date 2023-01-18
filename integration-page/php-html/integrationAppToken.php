<?php


use Firebase\JWT\JWT;

function getIntegrationAppToken(): string
{
    // Generating a token to access Integration.app API on behalf of your User

    $secret = '{WORKSPACE_SECRET}'; // Workspace Secret from console.integration.app
    $key = '{WORKSPACE_KEY}'; // Workspace Key from console.integration.app

    $payload = [
        'id' => "test@integration.app",  // Unique identifier of Account in your App
        'name' => "John Doe",  // Name of your User
        'iss' => $key
        ];
    return JWT::encode($payload, $secret, 'HS256');
};