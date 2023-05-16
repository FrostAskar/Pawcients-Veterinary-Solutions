package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Forms.RegisterVetAndClinicForm;
import com.esliceu.pawcients.Models.Clinic;
import com.esliceu.pawcients.Repos.ClinicRepo;
import org.springframework.stereotype.Service;

@Service
public class ClinicService {

    ClinicRepo clinicRepo;

    public ClinicService (ClinicRepo clinicRepo) {
        this.clinicRepo = clinicRepo;
    }

    public String saveClinic(RegisterVetAndClinicForm registerVetAndClinicForm) {
        Clinic clinic = new Clinic();
        clinic.setName(registerVetAndClinicForm.getClinicName());
        clinic.setAddress(registerVetAndClinicForm.getClinicAddress());
        return clinicRepo.save(clinic).getId();
    }

    public Clinic recoverClinicById(String clinic_id) {
        return clinicRepo.findById(clinic_id).get();
    }
}
