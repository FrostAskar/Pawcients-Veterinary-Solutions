package com.esliceu.pawcients.Models.HistoryDetails;

import java.time.LocalDate;

public class Deworming {


    String visitId;
    String name;
    LocalDate administeredDate;

    public Deworming(){}

    public Deworming(String visitId, String name, LocalDate administeredDate) {
        this.visitId = visitId;
        this.name = name;
        this.administeredDate = administeredDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getAdministeredDate() {
        return administeredDate;
    }

    public void setAdministeredDate(LocalDate administeredDate) {
        this.administeredDate = administeredDate;
    }

    public String getVisitId() {
        return visitId;
    }

    public void setVisitId(String visitId) {
        this.visitId = visitId;
    }
}
