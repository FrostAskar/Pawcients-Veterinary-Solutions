package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Exceptions.NotFoundUserException;
import com.esliceu.pawcients.Exceptions.UnauthorizedUserException;
import com.esliceu.pawcients.Exceptions.UnverifiedUserException;
import com.esliceu.pawcients.Forms.FindMascotForm;
import com.esliceu.pawcients.Forms.RegisterMascotForm;
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

    @GetMapping("/mascot/{mascotId}")
    @CrossOrigin
    public Mascot getMascot(@PathVariable String mascotId) {
        return mascotService.findMascotById(mascotId);
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
        User user = (User) req.getAttribute("user");
        String mascotId;
        try {
            mascotId =  mascotService.saveMascot(registerMascotForm, clientId, user);
            result.put("mascotId", mascotId);
        } catch (NotFoundUserException | UnverifiedUserException | UnauthorizedUserException e) {
            result.put("error", e.getMessage());
            res.setStatus(409);
        }
        return result;
    }
}
