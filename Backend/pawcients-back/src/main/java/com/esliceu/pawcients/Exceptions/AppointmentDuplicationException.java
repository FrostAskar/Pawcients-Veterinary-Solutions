package com.esliceu.pawcients.Exceptions;

public class AppointmentDuplicationException extends RuntimeException{

    public AppointmentDuplicationException(String message) {
        super(message);
    }
}
