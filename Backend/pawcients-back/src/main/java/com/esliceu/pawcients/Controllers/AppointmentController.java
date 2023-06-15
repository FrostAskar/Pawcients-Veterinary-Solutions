package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.DTO.CalendarAppointmentDTO;
import com.esliceu.pawcients.DTO.NextSevenDaysAppointmentsDTO;
import com.esliceu.pawcients.DTO.TodayAppointmentsDTO;
import com.esliceu.pawcients.Exceptions.*;
import com.esliceu.pawcients.Forms.AppointmentForm;
import com.esliceu.pawcients.Models.Appointment;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Services.AppointmentService;
import com.esliceu.pawcients.Services.MascotService;
import com.esliceu.pawcients.Services.PermissionService;
import com.esliceu.pawcients.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    PermissionService permissionService;

    public AppointmentController(AppointmentService appointmentService, UserService userService,
                                 MascotService mascotService, PermissionService permissionService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
        this.mascotService = mascotService;
        this.permissionService = permissionService;
    }

    @GetMapping("/vet/{vetId}/appointment")
    @CrossOrigin
    public Map<String, Object> getAppointments(@PathVariable String vetId,
                                               HttpServletResponse res, HttpServletRequest req) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserWorker(actualUser);
            List<CalendarAppointmentDTO> calendarAppointments = appointmentService.getCalendarAppointmentsByVet(vetId);
            result.put("calendarAppointments", calendarAppointments);
            res.setStatus(200);
        } catch (ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        }
        return result;
    }

    @GetMapping("/client/{clientId}/appointment")
    @CrossOrigin
    public Map<String, Object> getAppointmentsByClient(@PathVariable String clientId,
                                                                HttpServletResponse res, HttpServletRequest req) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserVerified(actualUser);
            permissionService.isActualUserAuthorized(actualUser, clientId);
            List<CalendarAppointmentDTO> calendarAppointments = appointmentService.getCalendarAppointmentsByClient(clientId);
            result.put("calendarAppointments", calendarAppointments);
            res.setStatus(200);
        } catch (ExpiredUserException | UnverifiedUserException | UnauthorizedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        }
        return result;
    }

    @PostMapping("/vet/{vetId}/appointment")
    @CrossOrigin
    public Map<String, Object> vetCreatesAppointment(@PathVariable String vetId,
                                                     @RequestBody AppointmentForm appointmentForm,
                                                     HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserWorker(actualUser);
            String appointmentId = appointmentService.createVetAppointment(appointmentForm, vetId);
            result.put("appointmentId", appointmentId);
            res.setStatus(200);
        } catch (ExpiredUserException | UnauthorizedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (AppointmentDuplicationException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @PostMapping("/client/{clientId}/appointment")
    @CrossOrigin
    public Map<String, Object> clientRequestsAppointment(@PathVariable String clientId,
                                                         @RequestBody AppointmentForm appointmentForm,
                                                         HttpServletRequest req, HttpServletResponse res){
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserVerified(actualUser);
            permissionService.isActualUserAuthorized(actualUser, clientId);
            String appointmentId = appointmentService.createClientAppointment(appointmentForm, clientId);
            result.put("appointmentId", appointmentId);
            res.setStatus(200);
        } catch (ExpiredUserException | UnauthorizedUserException | UnverifiedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (AppointmentDuplicationException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @DeleteMapping("/vet/{vetId}/appointment/{appointmentId}")
    @CrossOrigin
    public Map<String, Object> vetDeletesAppointment(@PathVariable String vetId,
                                                     @PathVariable String appointmentId,
                                                     HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserWorker(actualUser);
            appointmentId = appointmentService.deleteAppointment(appointmentId, vetId);
            result.put("deleted appointmentId", appointmentId);
            res.setStatus(200);
        } catch (ExpiredUserException | UnauthorizedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        }catch (NotFoundAppointmentException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @DeleteMapping("/client/{clientId}/appointment/{appointmentId}")
    @CrossOrigin
    public Map<String, Object> clientDeletesAppointment(@PathVariable String clientId,
                                                        @PathVariable String appointmentId,
                                                        HttpServletRequest req, HttpServletResponse res){
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserVerified(actualUser);
            permissionService.isActualUserAuthorized(actualUser, clientId);
            appointmentId = appointmentService.deleteAppointment(appointmentId, clientId);
            result.put("deleted appointmentId", appointmentId);
            res.setStatus(200);
        } catch (ExpiredUserException | UnauthorizedUserException | UnverifiedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        }catch (NotFoundAppointmentException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }


    @GetMapping("/vet/appointments")
    @CrossOrigin
    public Map<String, Object> getTodayAppointmentsForVet(HttpServletRequest req) {
        Map<String, Object> result = new HashMap<>();
        User actualUser = (User) req.getAttribute("user");
        List<Appointment> todayAppointments = appointmentService.getTodaysAppointments(actualUser);
        List<TodayAppointmentsDTO> todayData = new ArrayList<>();
        for(Appointment a : todayAppointments) {
            TodayAppointmentsDTO tadto = new TodayAppointmentsDTO();
            tadto.setUser(userService.generateUser(a.getClientId()));
            tadto.setMascot(mascotService.findMascotById(a.getMascotId()));
            tadto.setAppointment(appointmentService.findAppointmentById(a.getId()));
            todayData.add(tadto);
        }
        result.put("appointments", todayData);
        return result;
    }

    @PutMapping("/vet/appointment/{appointmentId}")
    @CrossOrigin
    public Map<String, Object> updateAppointment(@PathVariable String appointmentId,
                                                 @RequestBody AppointmentForm appointmentForm,
                                                 HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserWorker(actualUser);
            Appointment appointment = appointmentService.findAppointmentById(appointmentId);
            String modifiedAppointmentId = appointmentService.completeAppointment(appointment, appointmentForm);
            result.put("modified appointmentId", modifiedAppointmentId);
            res.setStatus(200);
        } catch (ExpiredUserException | UnauthorizedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (NotFoundAppointmentException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @GetMapping("/vet/appointmentgraph")
    @CrossOrigin
    public Map<String, Object> getAppointmentsForGraphic(HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserWorker(actualUser);
            List<NextSevenDaysAppointmentsDTO> nextAppointments = appointmentService.getNextSevenDaysAppointmentsCount(actualUser);
            result.put("nextSevenDaysAppointments", nextAppointments);
            res.setStatus(200);
        } catch (ExpiredUserException | UnauthorizedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        }
        return result;
    }
}
