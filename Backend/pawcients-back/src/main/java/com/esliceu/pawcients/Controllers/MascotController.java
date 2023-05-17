package com.esliceu.pawcients.Controllers;

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

        mascotService.saveMascot(registerMascotForm);

        return result;
    }
}
