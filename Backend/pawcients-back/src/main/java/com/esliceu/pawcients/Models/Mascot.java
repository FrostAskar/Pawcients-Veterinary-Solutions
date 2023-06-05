package com.esliceu.pawcients.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "Mascot")
public class Mascot {
    @Id
    String id;
    String clinicId;
    String name;
    String photo = "https://thecontemporarypet.com/wp-content/themes/contemporarypet/images/default.png";
    String species;
    String breed;
    int age;
    String gender;
    int weight;
    String color;
    String identificationSerial;
    LocalDate birthDate;
    String ownerId;
    String historyId;

    public Mascot(){}

    public Mascot(String id, String clinicId, String name, String species, String race, LocalDate birthDate, String ownerId) {
        this.id = id;
        this.clinicId = clinicId;
        this.name = name;
        this.species = species;
        this.breed = race;
        this.birthDate = birthDate;
        this.ownerId = ownerId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getClinicId() {
        return clinicId;
    }

    public void setClinicId(String clinicId) {
        this.clinicId = clinicId;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
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

    public String getHistoryId() {
        return historyId;
    }

    public void setHistoryId(String historyId) {
        this.historyId = historyId;
    }
}
