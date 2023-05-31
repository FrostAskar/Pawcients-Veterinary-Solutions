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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;


@RestController
public class MascotController {

    MascotService mascotService;
    UserService userService;

    public MascotController(MascotService mascotService, UserService userService) {
        this.mascotService = mascotService;
        this.userService = userService;
    }

    @GetMapping("/mascot/{mascotId}")
    @CrossOrigin
    public Mascot getMascot(@PathVariable String mascotId) {
        return mascotService.findMascotById(mascotId);
    }

    @GetMapping("/client/{clientId}/mascots")
    @CrossOrigin
    public List<Mascot> getMascotsFromClient(@PathVariable String clientId) {
        return mascotService.findMascotsByUser(clientId);
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
