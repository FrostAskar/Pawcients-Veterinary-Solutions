package com.esliceu.pawcients.Models.HistoryDetails;

import java.time.LocalDate;

public class Visit {

    LocalDate date;
    String description;

    public Visit(LocalDate date, String description) {
        this.date = date;
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}