package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.DTO.TodayAppointmentsDTO;
import com.esliceu.pawcients.Exceptions.NotFoundAppointmentException;
import com.esliceu.pawcients.Forms.AppointmentForm;
import com.esliceu.pawcients.Models.Appointment;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Services.AppointmentService;
import com.esliceu.pawcients.Services.MascotService;
import com.esliceu.pawcients.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AppointmentController {

    AppointmentService appointmentService;
    UserService userService;
    MascotService mascotService;

    public AppointmentController(AppointmentService appointmentService, UserService userService, MascotService mascotService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
        this.mascotService = mascotService;
    }

    @GetMapping("/vet/{vetId}/appointment")
    @CrossOrigin
    public List<Appointment> getAppointments(@PathVariable String vetId) {
        return appointmentService.getAppointmentsByVet(vetId);
    }

    @GetMapping("/vet/{vetId}/appointment/client/{clientId}")
    @CrossOrigin
    public List<Appointment> getAppointmentsByClient(@PathVariable String vetId,
                                                     @PathVariable String clientId) {

        return appointmentService.getAppointmentsByVetAndClient(vetId, clientId);
    }

    @PostMapping("/vet/{vetId}/appointment")
    @CrossOrigin
    public Map<String, Object> vetCreatesAppointment(@PathVariable String vetId,
                                       @RequestBody AppointmentForm appointmentForm) {
        Map<String, Object> result = new HashMap<>();
        String appointmentId;
        try {
            appointmentId = appointmentService.createVetAppointment(appointmentForm, vetId);
            result.put("appointmentId", appointmentId);
        } catch (Exception e) {
            result.put("error", e.getMessage());
        }
        return result;
    }

    @PostMapping("/client/{clientId}/appointment")
    @CrossOrigin
    public Map<String, Object> clientRequestsAppointment(@PathVariable String clientId,
                                           @RequestBody AppointmentForm appointmentForm){
        Map<String, Object> result = new HashMap<>();
        String appointmentId;
        try {
            appointmentId = appointmentService.createClientAppointment(appointmentForm, clientId);
            result.put("appointmentId", appointmentId);
        } catch (Exception e) {
            result.put("error", e.getMessage());
        }
        return result;
    }

    @DeleteMapping("/vet/{vetId}/appointment/{appointmentId}")
    @CrossOrigin
    public Map<String, Object> vetDeletesAppointment(@PathVariable String vetId,
                                       @PathVariable String appointmentId) {
        Map<String, Object> result = new HashMap<>();
        try {
            appointmentId = appointmentService.deleteAppointment(appointmentId, vetId);
            result.put("deleted appointmentId", appointmentId);
        } catch (NotFoundAppointmentException e) {
            result.put("error", e.getMessage());
        }
        return result;
    }

    @DeleteMapping("/client/{clientId}/appointment/{appointmentId}")
    @CrossOrigin
    public Map<String, Object> clientDeletesAppointment(@PathVariable String clientId,
                                           @PathVariable String appointmentId){
        Map<String, Object> result = new HashMap<>();
        try {
            appointmentId = appointmentService.deleteAppointment(appointmentId, clientId);
            result.put("deleted appointmentId", appointmentId);
        } catch (NotFoundAppointmentException e) {
            result.put("error", e.getMessage());
        }
        return result;
    }


    @GetMapping("/vet/clients")
    @CrossOrigin
    public Map<String, Object> getClientsForVet(HttpServletRequest req) {
        Map<String, Object> result = new HashMap<>();
        User actualUser = (User) req.getAttribute("user");
        List<Appointment> todayAppointments = appointmentService.getTodaysAppointments(actualUser);
        List<TodayAppointmentsDTO> todayData = new ArrayList<>();
        for(Appointment a : todayAppointments) {
            TodayAppointmentsDTO tadto = new TodayAppointmentsDTO();
            tadto.setUser(userService.generateUser(a.getOwnerId()));
            tadto.setMascot(mascotService.findMasctorById(a.getMascotId()));
            tadto.setAppointment(appointmentService.findAppointmentById(a.getId()));
            todayData.add(tadto);
        }
        result.put("appointments", todayData);
        return result;
    }
}
