package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.DTO.MascotDTO;
import com.esliceu.pawcients.Exceptions.*;
import com.esliceu.pawcients.Forms.FindMascotForm;
import com.esliceu.pawcients.Forms.RegisterMascotForm;
import com.esliceu.pawcients.Forms.UpdateMascotForm;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Services.MascotService;
import com.esliceu.pawcients.Services.PermissionService;
import com.esliceu.pawcients.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
public class MascotController {

    MascotService mascotService;
    UserService userService;
    PermissionService permissionService;

    public MascotController(MascotService mascotService, UserService userService, PermissionService permissionService) {
        this.mascotService = mascotService;
        this.userService = userService;
        this.permissionService = permissionService;
    }

    @GetMapping("/client/{clientId}/mascot/{mascotId}")
    @CrossOrigin
    public Map<String, Object> getMascot(@PathVariable String mascotId, @PathVariable String clientId,
                                         HttpServletResponse res, HttpServletRequest req) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserVerified(actualUser);
            permissionService.isActualUserAuthorized(actualUser, clientId);
            Mascot mascot = mascotService.findMascotById(mascotId);
            result.put("mascot", mascot);
            res.setStatus(200);
        } catch (UnauthorizedUserException | ExpiredUserException | UnverifiedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (NotFoundMascotException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @GetMapping("/client/{clientId}/mascots")
    @CrossOrigin
    public Map<String, Object> getMascotsFromClient(@PathVariable String clientId, HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserVerified(actualUser);
            permissionService.isActualUserAuthorized(actualUser, clientId);
            List<Mascot> mascots = mascotService.findMascotsByUser(clientId);
            result.put("mascots", mascots);
            res.setStatus(200);
        } catch (UnauthorizedUserException | ExpiredUserException | UnverifiedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        }
        return result;
    }

    @GetMapping("/vet/mascots")
    @CrossOrigin
    public Map<String, Object> getMascotsByClinic(HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        List<MascotDTO> mascotData = new ArrayList<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserWorker(actualUser);
            List<Mascot> mascots = mascotService.findMascotsByClinic(actualUser.getClinicId());
            for(Mascot m : mascots) {
                MascotDTO mdto = new MascotDTO();
                User u = userService.generateUser(m.getOwnerId());
                mdto.setId(m.getId());
                mdto.setName(m.getName());
                mdto.setSpecies(m.getSpecies());
                mdto.setGender(m.getGender());
                mdto.setBirthDate(m.getBirthDate());
                mdto.setOwnerName(u.getName());
                mdto.setOwnerSurname(u.getSurname());
                mascotData.add(mdto);
            }
            result.put("mascotData", mascotData);
            res.setStatus(200);
        } catch (UnauthorizedUserException | ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        }
        return result;
    }

    @GetMapping("/vet/mascot/{mascotId}")
    @CrossOrigin
    public Map<String, Object> getMascotById(@PathVariable String mascotId, HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserWorker(actualUser);
            Mascot m = mascotService.findMascotById(mascotId);
            result.put("mascot", m);
            res.setStatus(200);
        } catch (UnauthorizedUserException | ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (NotFoundUserException | NotFoundMascotException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @PostMapping("/client/{clientId}/mascot")
    @CrossOrigin
    public Map<String, Object> registerMascot(@RequestBody RegisterMascotForm registerMascotForm,
                                              @PathVariable String clientId,
                                              HttpServletResponse res, HttpServletRequest req) {
        Map<String, Object> result = new HashMap<>();
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            permissionService.isActualUserWorker(actualUser);
            Mascot mascot = new Mascot(
                    null,
                    actualUser.getClinicId(),
                    registerMascotForm.getMascotName(),
                    registerMascotForm.getSpecies(),
                    registerMascotForm.getBreed(),
                    registerMascotForm.getGender(),
                    registerMascotForm.getBirthDate(),
                    clientId);
            String mascotId =  mascotService.saveMascot(mascot);
            result.put("mascotId", mascotId);
        } catch (UnauthorizedUserException | ExpiredUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(401);
        } catch (NotFoundUserException e){
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @PutMapping("/mascot/{mascotId}")
    @CrossOrigin
    public String updateMascotInfo(@PathVariable String mascotId,
                                   HttpServletRequest req, HttpServletResponse res,
                                   @RequestBody UpdateMascotForm updateMascotForm) {
        try {
            User actualUser = userService.getActualUser((User) req.getAttribute("user"));
            Mascot mascotToUpdate = mascotService.findMascotById(mascotId);
            permissionService.isActualUserVerified(actualUser);
            permissionService.isActualUserAuthorized(actualUser, mascotToUpdate.getOwnerId());
            mascotToUpdate = mascotService.updateMascotInfo(mascotToUpdate, updateMascotForm);
            mascotService.updateMascot(mascotToUpdate);
        } catch (ExpiredUserException | UnverifiedUserException | UnauthorizedUserException e) {
            res.setStatus(401);
            return e.getMessage();
        } catch (NotFoundMascotException e){
            res.setStatus(409);
            return e.getMessage();
        }
        return "ok";
    }

}
