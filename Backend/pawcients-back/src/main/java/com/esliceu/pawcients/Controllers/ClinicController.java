package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Exceptions.NotFoundClinicException;
import com.esliceu.pawcients.Exceptions.UnauthorizedUserException;
import com.esliceu.pawcients.Exceptions.ExpiredUserException;
import com.esliceu.pawcients.Forms.UpdateClinicForm;
import com.esliceu.pawcients.Models.Clinic;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Services.ClinicService;
import com.esliceu.pawcients.Services.PermissionService;
import com.esliceu.pawcients.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ClinicController {

    ClinicService clinicService;
    UserService userService;
    PermissionService permissionService;

    public ClinicController (ClinicService clinicService, UserService userService, PermissionService permissionService) {
        this.clinicService = clinicService;
        this.userService = userService;
        this.permissionService = permissionService;
    }

    @GetMapping("/clinic/{clinicId}")
    @CrossOrigin
    public Map<String, Object> getClinic(@PathVariable String clinicId, HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserAdmin(actualUser);
            Clinic clinic = clinicService.recoverClinicById(clinicId);
            result.put("clinic", clinic);
            res.setStatus(200);
        } catch (UnauthorizedUserException | ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (NotFoundClinicException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @DeleteMapping("/clinic/{clinicId}")
    @CrossOrigin
    public Map<String, Object> deleteClinic(@PathVariable String clinicId, HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserAdmin(actualUser);
            String action = clinicService.deleteClinic(clinicId);
            result.put("action", action);
            res.setStatus(200);
        } catch (UnauthorizedUserException | ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (NotFoundClinicException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @PutMapping("/clinic/{clinicId}")
    @CrossOrigin
    public Map<String, Object> updateClinic(@PathVariable String clinicId, HttpServletRequest req, HttpServletResponse res,
                               @RequestBody UpdateClinicForm updateClinicForm) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserAdmin(actualUser);
            Clinic clinic = clinicService.recoverClinicById(clinicId);
            result.put("clinic", clinic);
            res.setStatus(200);
        } catch (UnauthorizedUserException | ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (NotFoundClinicException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }
}
