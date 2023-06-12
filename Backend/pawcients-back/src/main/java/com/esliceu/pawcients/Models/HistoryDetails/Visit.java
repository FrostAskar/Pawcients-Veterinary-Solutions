package com.esliceu.pawcients.Models.HistoryDetails;

import java.time.LocalDate;

public class Visit {

    LocalDate date;
    String notes;

    Vaccine vaccine;
    Surgery surgery;
    Deworming deworming;

    public Visit(LocalDate date, String notes) {
        this.date = date;
        this.notes = notes;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Vaccine getVaccine() {
        return vaccine;
    }

    public void setVaccine(Vaccine vaccine) {
        this.vaccine = vaccine;
    }

    public Surgery getSurgery() {
        return surgery;
    }

    public void setSurgery(Surgery surgery) {
        this.surgery = surgery;
    }

    public Deworming getDeworming() {
        return deworming;
    }

    public void setDeworming(Deworming deworming) {
        this.deworming = deworming;
    }
}
