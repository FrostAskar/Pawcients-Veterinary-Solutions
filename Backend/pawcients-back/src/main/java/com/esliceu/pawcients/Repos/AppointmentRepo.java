package com.esliceu.pawcients.Repos;


import com.esliceu.pawcients.Models.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepo extends MongoRepository<Appointment, String> {
    List<Appointment> findByWorkerId(String vetId);
    List<Appointment> findByWorkerIdAndClientId(String vetId, String clientId);
    List<Appointment> findByClientIdOrderByStartDate(String clientId);

    boolean existsByClientId(String clientId);
}
