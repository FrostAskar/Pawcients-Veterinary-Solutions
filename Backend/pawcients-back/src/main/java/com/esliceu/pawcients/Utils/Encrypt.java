package com.esliceu.pawcients.Utils;

import java.math.BigInteger;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

public class Encrypt {
    public static String sha512(String pass) {
        // Encrypt password with sha256
        String encodedPass = null;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-512");
            digest.reset();
            digest.update(pass.getBytes(StandardCharsets.UTF_8));
            encodedPass = String.format("%0128x", new BigInteger(1,digest.digest()));
        } catch (Exception e) {
            System.err.println(e);
        }
        return encodedPass;
    }

    public static String createTempPassword() {
        String charsToUse = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder tempPass = new StringBuilder();
        Random rng = new Random();
        for (int i = 0; i < 8; i++) {
            int rngChar = (int) (rng.nextFloat() * charsToUse.length());
            tempPass.append(charsToUse.charAt(rngChar));
        }
        return tempPass.toString();
    }
}
