package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.FailedActionException;
import com.esliceu.pawcients.Exceptions.IncorrectRegisterException;
import com.esliceu.pawcients.Exceptions.NotFoundClinicException;
import com.esliceu.pawcients.Forms.RegisterVetAndClinicForm;
import com.esliceu.pawcients.Models.Clinic;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Repos.ClinicRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClinicService {

    ClinicRepo clinicRepo;

    public ClinicService (ClinicRepo clinicRepo) {
        this.clinicRepo = clinicRepo;
    }

    public String saveClinic(Clinic clinic) {
        Clinic c = clinicRepo.findByNameAndAddress(clinic.getName(),
                clinic.getAddress());
        if(c != null) {
            throw new IncorrectRegisterException("This clinic is already registered");
        }
        return clinicRepo.save(clinic).getId();
    }

    public Clinic recoverClinicById(String clinicId) {
        if(clinicRepo.findById(clinicId).isEmpty())
            throw new NotFoundClinicException("Clinic does not exist");
        return clinicRepo.findById(clinicId).get();
    }

    public String deleteClinic(String clinicId) {
        if(clinicRepo.findById(clinicId).isEmpty())
            throw new NotFoundClinicException("Clinic does not exist");
        clinicRepo.deleteById(clinicId);

        if(clinicRepo.findById(clinicId).isEmpty()) {
            //If deletes a clinic, deletes all users with that clinicId
            return "Clinic deleted successfully";
        } else {
            throw new FailedActionException("Clinic deletion error");
        }
    }
    
}
