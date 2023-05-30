package com.esliceu.pawcients.Exceptions;

public class UnauthorizedUserException extends RuntimeException{

    public UnauthorizedUserException(String message) {
        super(message);
    }
}
