package com.esliceu.pawcients.Forms;

import java.time.LocalDate;

public class UpdateHistoryForm {
    String visitNotes;
    String dewormingName;
    String surgeryName;
    String vaccineName;
    String vaccineRenewal;

    public String getVisitNotes() {
        return visitNotes;
    }

    public void setVisitNotes(String visitNotes) {
        this.visitNotes = visitNotes;
    }

    public String getDewormingName() {
        return dewormingName;
    }

    public void setDewormingName(String dewormingName) {
        this.dewormingName = dewormingName;
    }

    public String getSurgeryName() {
        return surgeryName;
    }

    public void setSurgeryName(String surgeryName) {
        this.surgeryName = surgeryName;
    }

    public String getVaccineName() {
        return vaccineName;
    }

    public void setVaccineName(String vaccineName) {
        this.vaccineName = vaccineName;
    }

    public String getVaccineRenewal() {
        return vaccineRenewal;
    }

    public void setVaccineRenewal(String vaccineRenewal) {
        this.vaccineRenewal = vaccineRenewal;
    }
}
