package com.esliceu.pawcients.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "Mascot")
public class Mascot {

    @Id
    String id;
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

    public Mascot(String id, String name, String species, String race, LocalDate birthDate, String ownerId) {
        this.id = id;
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
}
