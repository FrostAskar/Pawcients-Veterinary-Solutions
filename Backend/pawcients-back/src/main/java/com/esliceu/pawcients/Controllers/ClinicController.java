package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Models.Clinic;
import com.esliceu.pawcients.Services.ClinicService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClinicController {

    ClinicService clinicService;

    public ClinicController (ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping("/clinic/{clinicId}")
    @CrossOrigin
    public Clinic getClinic(@PathVariable String clinic_id) {
        return clinicService.recoverClinicById(clinic_id);
    }
}
