package com.esliceu.pawcients.Models;

import com.esliceu.pawcients.Models.HistoryDetails.Deworming;
import com.esliceu.pawcients.Models.HistoryDetails.Sterilization;
import com.esliceu.pawcients.Models.HistoryDetails.Vaccine;
import com.esliceu.pawcients.Models.HistoryDetails.Visit;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;


/*
    History is a collection of all the procedures, analysis and revisions a mascot
    can undergo during its lifetime
*/
@Document(collection = "History")
public class History {

    @Id
    String id;
    List<Vaccine> vaccination;
    List<Visit> visits;
    List<Deworming> dewormings;
    Sterilization sterilization;

    public History(){}

    public History(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Vaccine> getVaccination() {
        return vaccination;
    }

    public void setVaccination(List<Vaccine> vaccination) {
        this.vaccination = vaccination;
    }

    public void addVaccination(Vaccine vaccine) {
        this.vaccination.add(vaccine);
    }

    public List<Visit> getVisits() {
        return visits;
    }

    public void setVisits(List<Visit> visits) {
        this.visits = visits;
    }

    public void addVisit(Visit visit) {
        this.visits.add(visit);
    }

    public List<Deworming> getDewormings() {
        return dewormings;
    }

    public void setDewormings(List<Deworming> dewormings) {
        this.dewormings = dewormings;
    }

    public void addDeworming(Deworming deworming) {
        this.dewormings.add(deworming);
    }

    public Sterilization getSterilization() {
        return sterilization;
    }

    public void setSterilization(Sterilization sterilization) {
        this.sterilization = sterilization;
    }
}
