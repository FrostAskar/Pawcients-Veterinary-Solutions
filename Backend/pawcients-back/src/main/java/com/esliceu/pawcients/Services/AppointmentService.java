package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Forms.AppointmentForm;
import com.esliceu.pawcients.Models.Appointment;
import com.esliceu.pawcients.Repos.AppointmentRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    AppointmentRepo appointmentRepo;

    public AppointmentService(AppointmentRepo appointmentRepo) {
        this.appointmentRepo = appointmentRepo;
    }

    public List<Appointment> getAppointmentsByVet(String vetId) {
        return appointmentRepo.findByWorkerId(vetId);
    }

    public List<Appointment> getAppointmentsByVetAndClient(String vetId, String clientId) {
        return appointmentRepo.findByWorkerIdAndOwnerId(vetId, clientId);
    }

    //VetId inserted just in case of checks?? Not really sure right now
    public String createVetAppointment(AppointmentForm appointmentForm, String vetId) {
        Appointment appointment = new Appointment(null,
                appointmentForm.getDate(),
                appointmentForm.getWorkerId(),
                appointmentForm.getClientId(),
                appointmentForm.getMascotId(),
                appointmentForm.getTypeAppointment());
        return appointmentRepo.save(appointment).getId();
    }

}
