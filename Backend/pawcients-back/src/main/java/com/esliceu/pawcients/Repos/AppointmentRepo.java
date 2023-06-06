package com.esliceu.pawcients.Repos;


import com.esliceu.pawcients.Models.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepo extends MongoRepository<Appointment, String> {
    List<Appointment> findByWorkerId(String vetId);
    List<Appointment> findByWorkerIdAndOwnerId(String vetId, String clientId);
    List<Appointment> findByWorkerIdAndDateBetweenOrderByDate(String workerId);
    List<Appointment> findByIdOrderByDate(String clientId);
}
