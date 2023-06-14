package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.NotFoundHistoryException;
import com.esliceu.pawcients.Forms.UpdateHistoryForm;
import com.esliceu.pawcients.Models.History;
import com.esliceu.pawcients.Models.HistoryDetails.Deworming;
import com.esliceu.pawcients.Models.HistoryDetails.Surgery;
import com.esliceu.pawcients.Models.HistoryDetails.Vaccine;
import com.esliceu.pawcients.Models.HistoryDetails.Visit;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Repos.HistoryRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class HistoryService {

    HistoryRepo historyRepo;

    public HistoryService(HistoryRepo historyRepo) {
        this.historyRepo = historyRepo;
    }

    //TODO Create exception for this
    public History getHistoryFromMascot(Mascot mascot) {
        if(mascot.getHistoryId() != null) {
            return historyRepo.findById(mascot.getHistoryId()).get();
        } else {
            throw new NotFoundHistoryException("This mascot has no history yet.");
        }
    }

    public String registerVisit(Mascot mascot, Visit visit, UpdateHistoryForm updateHistoryForm) {
        History history;
        if(mascot.getHistoryId() != null){
            history = historyRepo.findById(mascot.getHistoryId()).get();
        } else {
            history = new History();
        }
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
        history.addVisit(visit);
        return historyRepo.save(history).getId();
    }
}
