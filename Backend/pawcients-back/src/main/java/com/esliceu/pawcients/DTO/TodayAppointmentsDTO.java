package com.esliceu.pawcients.DTO;

import com.esliceu.pawcients.Models.Appointment;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Models.User;

public class TodayAppointmentsDTO {

    User user;

    Mascot mascot;

    Appointment appointment;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Mascot getMascot() {
        return mascot;
    }

    public void setMascot(Mascot mascot) {
        this.mascot = mascot;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
}
