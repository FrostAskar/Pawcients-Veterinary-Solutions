package com.esliceu.pawcients.Repos;

import com.esliceu.pawcients.Models.Clinic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicRepo extends MongoRepository<Clinic, String> {

    Clinic findByNameAndAddress(String name, String address);
}
