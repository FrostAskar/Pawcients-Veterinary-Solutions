package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Forms.UpdateHistoryForm;
import com.esliceu.pawcients.Models.History;
import com.esliceu.pawcients.Models.HistoryDetails.Deworming;
import com.esliceu.pawcients.Models.HistoryDetails.Surgery;
import com.esliceu.pawcients.Models.HistoryDetails.Vaccine;
import com.esliceu.pawcients.Models.HistoryDetails.Visit;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Services.HistoryService;
import com.esliceu.pawcients.Services.MascotService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class HistoryController {

    HistoryService historyService;
    MascotService mascotService;

    public HistoryController(HistoryService historyService, MascotService mascotService) {
        this.historyService = historyService;
        this.mascotService = mascotService;
    }

    @GetMapping("/mascot/{mascotId}/history")
    @CrossOrigin
    public History getHistoryForMascot(@PathVariable String mascotId,
                                             HttpServletRequest req) {
        User actualUser = (User) req.getAttribute("user");
        Mascot m = mascotService.findMascotById(mascotId);
        return historyService.getHistoryFromMascot(m);
    }

    @PostMapping("/mascot/{mascotId}/history")
    @CrossOrigin
    public Map<String, Object> createHistory(@PathVariable String mascotId,
                                             HttpServletRequest req,
                                             @RequestBody UpdateHistoryForm updateHistoryForm) {
        Map<String, Object> result = new HashMap<>();
        User actualUser = (User) req.getAttribute("user");
        Mascot mascot = mascotService.findMascotById(mascotId);
        LocalDate today = LocalDate.now();
        Visit visit = new Visit(today, updateHistoryForm.getVisitNotes());
        if(updateHistoryForm.getDewormingName() != null) {
            Deworming deworming = new Deworming(updateHistoryForm.getDewormingName());
            visit.setDeworming(deworming);
        } else if (updateHistoryForm.getSurgeryName() != null) {
            Surgery surgery = new Surgery(updateHistoryForm.getSurgeryName());
            visit.setSurgery(surgery);
        } else if (updateHistoryForm.getVaccineName() != null) {
            LocalDate renewalDate = LocalDate.parse(updateHistoryForm.getVaccineRenewal());
            Vaccine vaccine = new Vaccine(updateHistoryForm.getVaccineName(), renewalDate);
            visit.setVaccine(vaccine);
        }
        String historyId = historyService.registerVisit(mascot, visit);
        mascot.setHistoryId(historyId);
        mascotService.saveMascot(mascot, actualUser);
        result.put("historyId", historyId);
        return result;
    }
}
