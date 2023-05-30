package com.esliceu.pawcients.Exceptions;

public class NotFoundUserException extends RuntimeException{

    public NotFoundUserException(String message) {
        super(message);
    }
}
