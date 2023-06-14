package com.esliceu.pawcients.Models.HistoryDetails;

import java.time.LocalDate;

public class Deworming {

    String name;

    public Deworming(){}

    public Deworming(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
