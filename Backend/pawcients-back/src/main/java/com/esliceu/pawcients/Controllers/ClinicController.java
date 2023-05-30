package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Models.Clinic;
import com.esliceu.pawcients.Services.ClinicService;
import org.springframework.web.bind.annotation.*;

@RestController
public class ClinicController {

    ClinicService clinicService;

    public ClinicController (ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping("/clinic/{clinicId}")
    @CrossOrigin
    public Clinic getClinic(@PathVariable String clinicId) {
        return clinicService.recoverClinicById(clinicId);
    }

    @DeleteMapping("/clinic/{clinicId}")
    @CrossOrigin
    public String deleteClinic(@PathVariable String clinicId) {
        return clinicService.deleteClinic(clinicId);
    }
}
