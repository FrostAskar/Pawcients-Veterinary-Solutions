package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Forms.AppointmentForm;
import com.esliceu.pawcients.Models.Appointment;
import com.esliceu.pawcients.Services.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AppointmentController {

    AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("/vet/{vetId}/appointment/")
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
    public String clientRequestsAppointment(@PathVariable String clientId,
                                           @RequestBody AppointmentForm appointmentForm){
        String result = null;

        return result;
    }

    @DeleteMapping("/vet/{vetId}/appointment/{appointmentId}")
    @CrossOrigin
    public String vetDeletesAppointment(@PathVariable String vetId,
                                       @PathVariable String appointmentId) {
        String result = null;

        return result;
    }

    @DeleteMapping("/client/{clientId}/appointment/{appointmentId}")
    @CrossOrigin
    public String clientDeletesAppointment(@PathVariable String clientId,
                                           @PathVariable String appointmentId){
        String result = null;

        return result;
    }
}
