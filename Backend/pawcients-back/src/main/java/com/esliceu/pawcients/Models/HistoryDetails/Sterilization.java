package com.esliceu.pawcients.Models.HistoryDetails;

import java.time.LocalDate;

public class Sterilization {

    String visitId;
    boolean isSterilized = false;
    LocalDate sterilizationDate;

    public Sterilization(){}

    public Sterilization(String visitId, LocalDate sterilizationDate) {
        this.visitId = visitId;
        this.isSterilized = true;
        this.sterilizationDate = sterilizationDate;
    }

    public LocalDate getSterilizationDate() {
        return sterilizationDate;
    }

    public void setSterilizationDate(LocalDate sterilizationDate) {
        this.sterilizationDate = sterilizationDate;
    }

    public String getVisitId() {
        return visitId;
    }

    public void setVisitId(String visitId) {
        this.visitId = visitId;
    }
}
