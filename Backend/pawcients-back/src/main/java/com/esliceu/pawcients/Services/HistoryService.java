package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Models.History;
import com.esliceu.pawcients.Models.HistoryDetails.Visit;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Repos.HistoryRepo;
import org.springframework.stereotype.Service;

@Service
public class HistoryService {

    HistoryRepo historyRepo;

    public HistoryService(HistoryRepo historyRepo) {
        this.historyRepo = historyRepo;
    }

    //TODO Create exception for this
    public History getHistoryFromMascot(Mascot mascot) {
        if(historyRepo.existsById(mascot.getHistoryId())) {
            return historyRepo.findById(mascot.getHistoryId()).get();
        } else {
            return null;
        }
    }

    public String registerVisit(Mascot mascot, Visit visit) {
        History history;
        if(historyRepo.existsById(mascot.getHistoryId())){
            history = historyRepo.findById(mascot.getHistoryId()).get();
        } else {
            history = new History();
        }
        history.addVisit(visit);
        return historyRepo.save(history).getId();
    }
}
