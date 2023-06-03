package com.esliceu.pawcients.Models.HistoryDetails;

import java.time.LocalDate;

public class Vaccine {

    String visitId;
    String name;
    LocalDate administrationDate;
    LocalDate renewalDate;
    
    public Vaccine(){}
    
    public Vaccine(String visitId, String name, LocalDate administrationDate, LocalDate renewalDate) {
        this.visitId = visitId;
        this.name = name;
        this.administrationDate = administrationDate;
        this.renewalDate = renewalDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getAdministrationDate() {
        return administrationDate;
    }

    public void setAdministrationDate(LocalDate administrationDate) {
        this.administrationDate = administrationDate;
    }

    public LocalDate getRenewalDate() {
        return renewalDate;
    }

    public void setRenewalDate(LocalDate renewalDate) {
        this.renewalDate = renewalDate;
    }

    public String getVisitId() {
        return visitId;
    }

    public void setVisitId(String visitId) {
        this.visitId = visitId;
    }
}
