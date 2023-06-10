package com.esliceu.pawcients.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/*
    Appointment is a visit that a mascot does to a vet/aux and is requested by the owner
*/

@Document(collection = "Appointment")
public class Appointment {

    @Id
    String id;
    LocalDateTime startDate;
    LocalDateTime endDate;
    String workerId;
    String clientId;
    String mascotId;
    boolean isCompleted = false;

    //todo No se me ocurren ni abreviaciones ni todos los tipos
    //Nature of the appointment: "" for revision, "" for vaccination and "" for ***
    String type;

    public Appointment() {
    }

    public Appointment(String id, LocalDateTime startDate, LocalDateTime endDate, String workerId, String ownerId, String mascotId, String type) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.workerId = workerId;
        this.clientId = ownerId;
        this.mascotId = mascotId;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public String getWorkerId() {
        return workerId;
    }

    public void setWorkerId(String workerId) {
        this.workerId = workerId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
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

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }
}
