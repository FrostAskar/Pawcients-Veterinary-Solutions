package com.esliceu.pawcients.Exceptions;

public class ExpiredUserException extends RuntimeException{

    public ExpiredUserException(String message) {
        super(message);
    }
}
