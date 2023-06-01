package com.esliceu.pawcients.Forms;

import java.time.LocalDate;

public class RegisterMascotForm {

    String mascotName;
    String species;
    String race;
    LocalDate birthDate;

    public String getMascotName() {
        return mascotName;
    }

    public void setMascotName(String mascotName) {
        this.mascotName = mascotName;
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
