package com.esliceu.pawcients.Forms;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AppointmentForm {

    String clientId;
    String mascotId;
    String workerId;
    String typeAppointment;
    LocalDateTime date;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getMascotId() {
        return mascotId;
    }

    public void setMascotId(String mascotId) {
        this.mascotId = mascotId;
    }

    public String getWorkerId() {
        return workerId;
    }

    public void setWorkerId(String workerId) {
        this.workerId = workerId;
    }

    public String getTypeAppointment() {
        return typeAppointment;
    }

    public void setTypeAppointment(String typeAppointment) {
        this.typeAppointment = typeAppointment;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
