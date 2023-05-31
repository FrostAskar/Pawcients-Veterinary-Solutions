package com.esliceu.pawcients.Exceptions;

public class IncorrectVerificationCodeException extends RuntimeException{

    public IncorrectVerificationCodeException(String message) {
        super(message);
    }

}
