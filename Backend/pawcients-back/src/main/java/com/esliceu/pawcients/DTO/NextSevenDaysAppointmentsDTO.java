package com.esliceu.pawcients.DTO;

import java.time.LocalDate;

public class NextSevenDaysAppointmentsDTO {

    LocalDate date;

    int appointments;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getAppointments() {
        return appointments;
    }

    public void setAppointments(int appointments) {
        this.appointments = appointments;
    }
}
