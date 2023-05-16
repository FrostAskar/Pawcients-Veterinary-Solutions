package com.esliceu.pawcients.Exceptions;

public class IncorrectLoginException extends RuntimeException{

    public IncorrectLoginException(String message) {
        super(message);
    }
}
