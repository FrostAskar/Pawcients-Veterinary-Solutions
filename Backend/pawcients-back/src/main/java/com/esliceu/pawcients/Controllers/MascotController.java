package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.DTO.MascotDTO;
import com.esliceu.pawcients.Exceptions.NotFoundUserException;
import com.esliceu.pawcients.Exceptions.UnauthorizedUserException;
import com.esliceu.pawcients.Exceptions.UnverifiedUserException;
import com.esliceu.pawcients.Forms.FindMascotForm;
import com.esliceu.pawcients.Forms.RegisterMascotForm;
import com.esliceu.pawcients.Forms.UpdateMascotForm;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Services.MascotService;
import com.esliceu.pawcients.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
public class MascotController {

    MascotService mascotService;
    UserService userService;

    public MascotController(MascotService mascotService, UserService userService) {
        this.mascotService = mascotService;
        this.userService = userService;
    }

    @GetMapping("/mascots")
    @CrossOrigin
    public Map<String, Object> getAllMascotsInClinic(HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        List<Mascot> mascots = new ArrayList<>();
        User actualUser = (User) req.getAttribute("user");
        List<User> usersInClinic = userService.getUsersByClinic(actualUser.getClinicId());
        try {
            for (User user : usersInClinic) {
                mascots.addAll(mascotService.findMascotsByUser(user.getId(), actualUser));
            }
            result.put("mascots", mascots);
        } catch (UnauthorizedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(403);
        }
        return result;
    }

    @GetMapping("/client/{clientId}/mascot/{mascotId}")
    @CrossOrigin
    //TODO check if mascot belongs to user
    public Mascot getMascot(@PathVariable String mascotId, @PathVariable String clientId) {
        return mascotService.findMascotByIdAndOwnerId(mascotId, clientId);
    }

    @GetMapping("/client/{clientId}/mascots")
    @CrossOrigin
    public Map<String, Object> getMascotsFromClient(@PathVariable String clientId, HttpServletRequest req, HttpServletResponse res) {
        Map<String, Object> result = new HashMap<>();
        User actualUser = (User) req.getAttribute("user");
        try {
            List<Mascot> mascots = mascotService.findMascotsByUser(clientId, actualUser);
            result.put("mascots", mascots);
        } catch (UnauthorizedUserException | UnverifiedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }

        return result;
    }

    @PostMapping("/mascot")
    @CrossOrigin
    public List<Mascot> searchMascot(@RequestBody FindMascotForm findMascotForm) {
        return mascotService.findMascotByForm(findMascotForm);
    }

    @PostMapping("/client/{clientId}/mascot")
    @CrossOrigin
    public Map<String, Object> registerMascot (@RequestBody RegisterMascotForm registerMascotForm,
                                               @PathVariable String clientId,
                                               HttpServletResponse res, HttpServletRequest req) {
        Map<String, Object> result = new HashMap<>();
        User actualUser = (User) req.getAttribute("user");
        Mascot mascot = new Mascot(
                null,
                actualUser.getClinicId(),
                registerMascotForm.getMascotName(),
                registerMascotForm.getSpecies(),
                registerMascotForm.getBreed(),
                registerMascotForm.getGender(),
                registerMascotForm.getBirthDate(),
                clientId
        );
        String mascotId;
        try {
            mascotId =  mascotService.saveMascot(mascot, actualUser);
            result.put("mascotId", mascotId);
        } catch (NotFoundUserException | UnverifiedUserException | UnauthorizedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }

    @GetMapping("/vet/mascots")
    @CrossOrigin
    public List<MascotDTO> getMascotsByClinic(HttpServletRequest req) {
        List<MascotDTO> mascotData = new ArrayList<>();
        User actualUser = (User) req.getAttribute("user");
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
        return mascotData;
    }

    //TODO CHECK IF IS VETERINARY TO RETRIEVE THE MASCOT (SECURITY)
    @GetMapping("/vet/mascot/{mascotId}")
    @CrossOrigin
    public MascotDTO getMascotById(@PathVariable String mascotId) {
        MascotDTO mdto = new MascotDTO();
        Mascot m = mascotService.findMascotById(mascotId);
        User u = userService.generateUser(m.getOwnerId());
        mdto.setId(m.getId());
        mdto.setName(m.getName());
        mdto.setSpecies(m.getSpecies());
        mdto.setBirthDate(m.getBirthDate());
        mdto.setOwnerName(u.getName());
        mdto.setOwnerSurname(u.getSurname());
        mdto.setImage(m.getPhoto());
        mdto.setWeight(m.getWeight());
        mdto.setBreed(m.getBreed());
        mdto.setGender(m.getGender());


        return mdto;
    }

    @PutMapping("/mascot/{mascotId}")
    @CrossOrigin
    public String updateMascotInfo(@PathVariable String mascotId,
                                   HttpServletRequest req,
                                   @RequestBody UpdateMascotForm updateMascotForm) {
        User actualUser = (User) req.getAttribute("user");
        Mascot mascotToUpdate = mascotService.findMascotById(mascotId);
        mascotToUpdate = mascotService.updateMascotInfo(mascotToUpdate, updateMascotForm);
        mascotService.updateMascot(mascotToUpdate);
        return "ok";
    }


}
