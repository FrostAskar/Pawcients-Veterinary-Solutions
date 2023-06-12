package com.esliceu.pawcients.Models.HistoryDetails;

import java.time.LocalDate;

public class Vaccine {

    String name;
    LocalDate renewalDate;
    
    public Vaccine(){}
    
    public Vaccine(String name, LocalDate renewalDate) {
        this.name = name;
        this.renewalDate = renewalDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getRenewalDate() {
        return renewalDate;
    }

    public void setRenewalDate(LocalDate renewalDate) {
        this.renewalDate = renewalDate;
    }

}
