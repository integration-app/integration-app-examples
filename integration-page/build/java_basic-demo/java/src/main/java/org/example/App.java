package org.example;

import spark.Request;
import spark.Response;
import spark.Route;

import java.security.*;
import java.security.spec.InvalidKeySpecException;

import static spark.Spark.*;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import com.google.gson.Gson;


public class App {
    public static void main(String[] args) {
        port(8080);
        get("/integration-token", "application/json", new Route() {
            public Object handle(Request req, Response res) throws NoSuchAlgorithmException, InvalidKeySpecException {

                // Your workspace key and secret.
                // You can find them on the Settings page.
                String workspaceKey = "03e73c01-5d40-4f2c-9e96-01c4e25290d5";
                String workspaceSecret = "bb6f60cec16d8028a7c411b567d8a4b5358daa3a06c0666f8b40d6cf8e6d86e5";

                String jwtToken = Jwts.builder()
                        .claim("id", "{USER_ID}") // Identifier of user or organization.
                        .claim("name", "{USER_NAME}") // Human-readable name (it will simplify troubleshooting)
                        // .claim("fields", <user fields value>) (optional) Any user fields you want to attach to your user.
                        .setExpiration(Date.from(new Date().toInstant().plus(14400, ChronoUnit.SECONDS))) // To prevent token from being used for too long
                        .setIssuer(workspaceKey)
                        .signWith(new SecretKeySpec(workspaceSecret.getBytes(), SignatureAlgorithm.HS256.getJcaName()), SignatureAlgorithm.HS256)
                        .setHeaderParam("typ", "JWT")
                        .compact();
                return new Gson().toJson(jwtToken);
            }
        });
        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
    }
}
