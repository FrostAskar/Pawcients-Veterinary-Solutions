package com.esliceu.pawcients.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class User {
    @Id
    String id;
    String name;
    String surname;
    @Indexed(unique = true)
    String license;
    @Indexed(unique = true)
    String email;
    String phone;

    //"vet" for Veterinary or "aux" for Auxiliary, "client" for Client
    String type;

    //Password field is not sent in the request to the front
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    String clinicId;
    String profilePicture;

    String verificationCodeEmail;
    boolean verificationCodeEmailCheck;
    public User(){}
    public User(String id, String name, String surname, String license, String email, String phone,
                String type, String password, String clinicId) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.license = license;
        this.email = email;
        this.phone = phone;
        this.type = type;
        this.password = password;
        this.clinicId = clinicId;
        this.profilePicture = "https://www.w3schools.com/howto/img_avatar.png";
        this.verificationCodeEmailCheck = false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean getVerificationCodeEmailCheck() {
        return verificationCodeEmailCheck;
    }

    public void setVerificationCodeEmailCheck(boolean verificationCodeEmailCheck) {
        this.verificationCodeEmailCheck = verificationCodeEmailCheck;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getVerificationCodeEmail() {
        return verificationCodeEmail;
    }

    public void setVerificationCodeEmail(String verificationCodeEmail) {
        this.verificationCodeEmail = verificationCodeEmail;
    }

    public String getClinicId() {
        return clinicId;
    }

    public void setClinicId(String clinicId) {
        this.clinicId = clinicId;
    }
}