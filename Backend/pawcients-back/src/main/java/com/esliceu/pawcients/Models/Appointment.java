package com.esliceu.pawcients.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

/*
    Appointment is a visit that a mascot does to a vet/aux and is requested by the owner
*/

@Document
public class Appointment {

    @Id
    String id;

    LocalDate date;
    String workerId;
    String ownerId;
    String mascotId;

    //todo No se me ocurren ni abreviaciones ni todos los tipos
    //Nature of the appointment: "" for revision, "" for vaccination and "" for ***
    String type;

    public Appointment() {
    }

    public Appointment(String id, LocalDate date, String workerId, String ownerId, String mascotId, String type) {
        this.id = id;
        this.date = date;
        this.workerId = workerId;
        this.ownerId = ownerId;
        this.mascotId = mascotId;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getWorkerId() {
        return workerId;
    }

    public void setWorkerId(String workerId) {
        this.workerId = workerId;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
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
}
