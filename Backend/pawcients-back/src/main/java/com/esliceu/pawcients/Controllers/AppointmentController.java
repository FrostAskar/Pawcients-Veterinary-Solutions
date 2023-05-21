package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Forms.AppointmentForm;
import com.esliceu.pawcients.Models.Appointment;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AppointmentController {

    @GetMapping("/vet/{vetId}/appointment/")
    @CrossOrigin
    public List<Appointment> getAppointments(@PathVariable String vetId) {
        List<Appointment> appointments = new ArrayList<>();

        return appointments;
    }

    @GetMapping("/vet/{vetId}/appointment/client/{clientId}")
    @CrossOrigin
    public List<Appointment> getAppointmentsByClient(@PathVariable String vetId,
                                                     @PathVariable String clientId) {
        List<Appointment> appointments = new ArrayList<>();

        return appointments;
    }

    @PostMapping("/vet/{vetId}/appointment")
    @CrossOrigin
    public String vetCreatesAppointment(@PathVariable String vetId,
                                       @RequestBody AppointmentForm appointmentForm) {
        String result = null;

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
