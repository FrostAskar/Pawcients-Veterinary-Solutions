package com.esliceu.pawcients.Models;

import com.esliceu.pawcients.Models.HistoryDetails.Deworming;
import com.esliceu.pawcients.Models.HistoryDetails.Vaccine;
import com.esliceu.pawcients.Models.HistoryDetails.Visit;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


/*
    History is a collection of all the procedures, analysis and revisions a mascot
    can undergo during its lifetime
*/
@Document(collection = "History")
public class History {

    @Id
    String id;
    List<Visit> visits;

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

    public List<Visit> getVisits() {
        return visits;
    }

    public void setVisits(List<Visit> visits) {
        this.visits = visits;
    }

    public void addVisit(Visit visit) {
        this.visits.add(visit);
    }

}
