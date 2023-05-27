package com.esliceu.pawcients.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;


/*
    History is a collection of all the procedures, analysis and revisions a mascot
    can undergo during its lifetime
*/
@Document(collection = "History")
public class History {

    @Id
    String id;

    String mascotId;

    //This one represents the nature of the requested
    String type;

    LocalDate date;

    public History(){}

    public History(String id, String mascotId, String type, LocalDate date) {
        this.id = id;
        this.mascotId = mascotId;
        this.type = type;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMascotId() {
        return mascotId;
    }

    public void setMascotId(String mascotId) {
        this.mascotId = mascotId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
