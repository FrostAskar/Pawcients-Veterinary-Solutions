package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.IncorrectRegisterException;
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

    public String saveClinic(RegisterVetAndClinicForm registerVetAndClinicForm) {
        Clinic clinic = clinicRepo.findByNameAndAddress(registerVetAndClinicForm.getClinicName(),
                registerVetAndClinicForm.getClinicAddress());
        if(clinic != null) {
            throw new IncorrectRegisterException("This clinic is already registered");
        }
        clinic = new Clinic();
        clinic.setName(registerVetAndClinicForm.getClinicName());
        clinic.setAddress(registerVetAndClinicForm.getClinicAddress());
        return clinicRepo.save(clinic).getId();
    }

    public Clinic recoverClinicById(String clinicId) {
        return clinicRepo.findById(clinicId).get();
    }

    public List<Clinic> findClinicById(String clinicId){
        return clinicRepo.findById(clinicId).stream().toList();
    }

    public String deleteClinic(String clinicId) {
        List<Clinic> clinics = findClinicById(clinicId);
        //Checks user exists to proceed
        if(clinics.size() < 1) {
            return "Clinic not found";
        }
        clinicRepo.deleteById(clinicId);
        
        //Verification delete has proceeded without error
        clinics = findClinicById(clinicId);
        if(clinics.size() < 1) {
            //If deletes a clinic, deletes all users with that clinicId
            return "Clinic deleted successfully";
        } else {
            return "Something went kaboom, please check";
        }
    }
    
}
