package com.esliceu.pawcients.Repos;


import com.esliceu.pawcients.Models.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepo extends MongoRepository<Appointment, String> {
    List<Appointment> findByWorkerIdOrderByStartDateAsc(String vetId);
    List<Appointment> findByWorkerIdAndClientId(String vetId, String clientId);
    List<Appointment> findByClientIdOrderByStartDateAsc(String clientId);
    boolean existsByClientId(String clientId);

    List<Appointment> findByClientId(String clientId);

    List<Appointment> findByWorkerIdAndStartDate(String vetId, LocalDateTime startDate);

    List<Appointment> findByWorkerIdAndStartDateAfterAndEndDateBefore(String vetId, LocalDateTime startDate, LocalDateTime endDate);
}
