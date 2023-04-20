package com.esliceu.pawcients.Repos;


import com.esliceu.pawcients.Models.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepo extends MongoRepository<Appointment, String> {

}
