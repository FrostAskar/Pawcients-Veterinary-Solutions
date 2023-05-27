package com.esliceu.pawcients.Controllers;

import com.esliceu.pawcients.Exceptions.NotFoundUserException;
import com.esliceu.pawcients.Exceptions.UnauthorizedUserException;
import com.esliceu.pawcients.Forms.FindMascotForm;
import com.esliceu.pawcients.Forms.RegisterMascotForm;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Services.MascotService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;


@RestController
public class MascotController {

    MascotService mascotService;

    public MascotController(MascotService mascotService) {
        this.mascotService = mascotService;
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
                                               @PathVariable String clientId) {
        Map<String, Object> result = new HashMap<>();
        String mascotId;
        try {
            mascotId =  mascotService.saveMascot(registerMascotForm, clientId);
            result.put("mascotId", mascotId);
        } catch (NotFoundUserException e) {
            result.put("error", e.getMessage());
        //todo for this one to work we need to request user currently logged in case is a client trying to insert animal in other costumer
        } catch (UnauthorizedUserException e) {
            result.put("error", e.getMessage());
        }
        return result;
    }
}
