package com.esliceu.pawcients.DTO;

import com.esliceu.pawcients.Models.Appointment;
import com.esliceu.pawcients.Models.User;

public class ClientDTO {

    User client;

    Appointment appointment;

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
}
