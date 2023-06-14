package com.esliceu.pawcients.Forms;

public class ExpiredUserException extends RuntimeException{

    public ExpiredUserException(String message) {
        super(message);
    }
}
