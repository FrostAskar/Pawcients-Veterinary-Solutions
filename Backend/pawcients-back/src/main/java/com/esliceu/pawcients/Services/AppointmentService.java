package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.NotFoundAppointmentException;
import com.esliceu.pawcients.Exceptions.UnauthorizedUserException;
import com.esliceu.pawcients.Forms.AppointmentForm;
import com.esliceu.pawcients.Models.Appointment;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Repos.AppointmentRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    AppointmentRepo appointmentRepo;
    UserService userService;

    public AppointmentService(AppointmentRepo appointmentRepo, UserService userService) {
        this.appointmentRepo = appointmentRepo;
        this.userService = userService;
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

    public String createClientAppointment(AppointmentForm appointmentForm, String clientId) {
        Appointment appointment = new Appointment(null,
                appointmentForm.getDate(),
                appointmentForm.getWorkerId(),
                appointmentForm.getClientId(),
                appointmentForm.getMascotId(),
                appointmentForm.getTypeAppointment());
        return appointmentRepo.save(appointment).getId();
    }

    public String deleteAppointment(String appointmentId, String userId) {
        Appointment appointment;
        if (appointmentRepo.findById(appointmentId).isEmpty()) {
            throw new NotFoundAppointmentException("There is no appointment with this data");
        } else {
            appointment = appointmentRepo.findById(appointmentId).get();
        }
        User user = userService.generateUser(userId);
        if(user.getType().equals("admin")) {
            appointmentRepo.deleteById(appointmentId);
        } else if (user.getId().equals(userId)) {
            appointmentRepo.deleteById(appointmentId);
        } else {
            throw new UnauthorizedUserException("Current user is not authorized to remove appointment");
        }
        return appointment.getId();
    }
}
