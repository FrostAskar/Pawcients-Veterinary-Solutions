package com.esliceu.pawcients.Forms;

import java.time.LocalDate;

public class RegisterMascotForm {

    String mascotName;
    String species;
    String breed;
    int age;
    String gender;
    int weight;
    String color;
    String identificationSerial;
    String allergies;
    String notes;
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

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getIdentificationSerial() {
        return identificationSerial;
    }

    public void setIdentificationSerial(String identificationSerial) {
        this.identificationSerial = identificationSerial;
    }

    public String getAllergies() {
        return allergies;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
