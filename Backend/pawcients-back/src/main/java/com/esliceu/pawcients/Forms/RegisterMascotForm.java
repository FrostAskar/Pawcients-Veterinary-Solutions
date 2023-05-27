package com.esliceu.pawcients.Forms;

import java.time.LocalDate;

public class RegisterMascotForm {

    String mascot_name;

    String species;

    String race;

    LocalDate birthDate;


    public String getMascot_name() {
        return mascot_name;
    }

    public void setMascot_name(String mascot_name) {
        this.mascot_name = mascot_name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getRace() {
        return race;
    }

    public void setRace(String race) {
        this.race = race;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
}
