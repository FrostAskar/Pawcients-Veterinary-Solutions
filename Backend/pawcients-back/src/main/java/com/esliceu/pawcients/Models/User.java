package com.esliceu.pawcients.Models;

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
    String password;
    String profile_picture;

    String verification_code_email;
    Boolean verification_code_email_checked;
    public User(){}
    public User(String id, String name, String surname, String license, String email, String phone, String type, String password, String profile_picture, String verification_code_email) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.license = license;
        this.email = email;
        this.phone = phone;
        this.type = type;
        this.password = password;
        this.profile_picture = profile_picture;
        this.verification_code_email = verification_code_email;
        this.verification_code_email_checked = false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Boolean getVerification_code_email_checked() {
        return verification_code_email_checked;
    }

    public void setVerification_code_email_checked(Boolean verification_code_email_checked) {
        this.verification_code_email_checked = verification_code_email_checked;
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

    public String getProfile_picture() {
        return profile_picture;
    }

    public void setProfile_picture(String profile_picture) {
        this.profile_picture = profile_picture;
    }

    public String getVerification_code_email() {
        return verification_code_email;
    }

    public void setVerification_code_email(String verification_code_email) {
        this.verification_code_email = verification_code_email;
    }
}
