package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.DTO.CalendarAppointmentDTO;
import com.esliceu.pawcients.DTO.NextSevenDaysAppointmentsDTO;
import com.esliceu.pawcients.Exceptions.AppointmentDuplicationException;
import com.esliceu.pawcients.Exceptions.NotFoundAppointmentException;
import com.esliceu.pawcients.Forms.AppointmentForm;
import com.esliceu.pawcients.Models.Appointment;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Repos.AppointmentRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    AppointmentRepo appointmentRepo;
    UserService userService;
    MascotService mascotService;

    public AppointmentService(AppointmentRepo appointmentRepo, UserService userService,
                              MascotService mascotService) {
        this.appointmentRepo = appointmentRepo;
        this.userService = userService;
        this.mascotService = mascotService;
    }

    public Appointment findAppointmentById(String appointmentId) {
        if(appointmentRepo.findById(appointmentId).isEmpty())
            throw new NotFoundAppointmentException("This appointment does not exist");
        return appointmentRepo.findById(appointmentId).get();
    }

    public List<CalendarAppointmentDTO> getCalendarAppointmentsByVet(String vetId) {
        List<Appointment> appointments = appointmentRepo.findByWorkerId(vetId);
        List<CalendarAppointmentDTO> calendarAppointments = new ArrayList<>();
        for(Appointment a : appointments) {
            User u = userService.generateUser(a.getClientId());
            Mascot m = mascotService.findMascotById(a.getMascotId());
            CalendarAppointmentDTO cadto = new CalendarAppointmentDTO();
            cadto.setTitle(m.getName() + "/" + u.getName() + " " + u.getSurname());
            cadto.setStartDate(a.getStartDate());
            cadto.setEndDate(a.getEndDate());
            cadto.setType(a.getType());
            cadto.setAppointmentId(a.getId());
            calendarAppointments.add(cadto);
        }
        return calendarAppointments;
    }

    public List<Appointment> getAppointmentsByVetAndClient(String vetId, String clientId) {
        return appointmentRepo.findByWorkerIdAndClientId(vetId, clientId);
    }

    //VetId inserted just in case of checks?? Not really sure right now
    public String createVetAppointment(AppointmentForm appointmentForm, String vetId) {
        checkAppointmentExists(appointmentForm, vetId);
        Appointment appointment = new Appointment(null,
                appointmentForm.getStartDate(),
                appointmentForm.getEndDate(),
                appointmentForm.getWorkerId(),
                appointmentForm.getClientId(),
                appointmentForm.getMascotId(),
                appointmentForm.getTypeAppointment());
        return appointmentRepo.save(appointment).getId();
    }

    private boolean checkAppointmentExists(AppointmentForm appointmentForm, String vetId) {
        if(appointmentRepo.findByWorkerIdAndStartDate(vetId, appointmentForm.getStartDate()).isEmpty())
            return true;
        throw new AppointmentDuplicationException("This hour is already occupied for this vet");
    }

    public String createClientAppointment(AppointmentForm appointmentForm, String clientId) {
        checkAppointmentExists(appointmentForm, appointmentForm.getWorkerId());
        Appointment appointment = new Appointment(null,
                appointmentForm.getStartDate(),
                appointmentForm.getEndDate(),
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
        }
        return appointment.getId();
    }

    public List<Appointment> getTodaysAppointments(User actualUser) {
        List<Appointment> appointments = appointmentRepo.findByWorkerId(actualUser.getId());
        List<Appointment> todayAppointments = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for(Appointment a : appointments) {
            if(a.getStartDate().toLocalDate().equals(today)){
                todayAppointments.add(a);
            }
        }
        return todayAppointments;
    }

    public Appointment getEarliestClientAppointment(String clientId) {
        if(appointmentRepo.existsByClientId(clientId)){
            return appointmentRepo.findByClientIdOrderByStartDate(clientId).get(0);
        } else {
            return null;
        }
    }

    public List<NextSevenDaysAppointmentsDTO> getNextSevenDaysAppointmentsCount(User actualUser) {
        List<NextSevenDaysAppointmentsDTO> nextSeven = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (int i = 1; i < 7; i++) {
            NextSevenDaysAppointmentsDTO nsdadto = new NextSevenDaysAppointmentsDTO();
            List<Appointment> dayAppointments = appointmentRepo.findByWorkerIdAndStartDate(actualUser.getId(), today.plusDays(i));
            nsdadto.setDate(today.plusDays(i));
            nsdadto.setAppointments(dayAppointments.size());
            nextSeven.add(nsdadto);
        }
        return nextSeven;
    }

    public void deleteAppointmentByClientId(String userId) {
        List<Appointment> appointmentsByClient = appointmentRepo.findByClientId(userId);
        if(appointmentsByClient.size() > 0) {
            for (Appointment a : appointmentsByClient) {
                appointmentRepo.deleteById(a.getId());
            }
        }
    }

    public List<CalendarAppointmentDTO> getCalendarAppointmentsByClient(String clientId) {
        List<Appointment> appointments = appointmentRepo.findByClientId(clientId);
        List<CalendarAppointmentDTO> calendarAppointments = new ArrayList<>();
        for(Appointment a : appointments) {
            User u = userService.generateUser(a.getWorkerId());
            Mascot m = mascotService.findMascotById(a.getMascotId());
            CalendarAppointmentDTO cadto = new CalendarAppointmentDTO();
            cadto.setTitle(m.getName() + "/" + u.getName() + " " + u.getSurname());
            cadto.setStartDate(a.getStartDate());
            cadto.setEndDate(a.getEndDate());
            cadto.setType(a.getType());
            cadto.setAppointmentId(a.getId());
            calendarAppointments.add(cadto);
        }
        return calendarAppointments;
    }

    public String completeAppointment(Appointment appointment, AppointmentForm appointmentForm) {
        appointment.setCompleted(appointmentForm.isCompleted());
        return appointmentRepo.save(appointment).getId();
    }
}
