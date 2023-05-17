package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.NotFoundMascotException;
import com.esliceu.pawcients.Forms.FindMascotForm;
import com.esliceu.pawcients.Forms.RegisterMascotForm;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Repos.MascotRepo;
import com.esliceu.pawcients.Repos.UserRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MascotService {

    MascotRepo mascotRepo;
    UserService userService;

    public MascotService(MascotRepo mascotRepo, UserService userService) {
        this.mascotRepo = mascotRepo;
        this.userService = userService;
    }

    public List<Mascot> findMascotByForm(FindMascotForm findMascotForm) {
        List<Mascot> mascots = new ArrayList<>();

        if(!findMascotForm.getMascot_id().isEmpty()){
            mascots.add(mascotRepo.findById(findMascotForm.getMascot_id()).get());
        }else if(!findMascotForm.getOwner_id().isEmpty()) {
            mascots = mascotRepo.findByOwnerId(findMascotForm.getOwner_id());
        }else if(!findMascotForm.getMascot_name().isEmpty()) {
            mascots = mascotRepo.findByName(findMascotForm.getMascot_name());
        }else if(!findMascotForm.getOwner_name().isEmpty()) {
            User owner = userService.generateUser(findMascotForm.getOwner_name());
            mascots = mascotRepo.findByOwnerId(owner.getId());
        }else {
            throw new NotFoundMascotException("Mascot not found on database");
        }

        return mascots;
    }

    public Mascot findMascotById(String mascotId) {
        List<Mascot> mascots = mascotRepo.findById(mascotId).stream().toList();
        if (mascots.size() < 1) {
            throw new NotFoundMascotException("This is not a valid mascot");
        }
        return mascots.get(0);
    }

    public List<Mascot> findMascotsByUser(String userId) {
        return mascotRepo.findByOwnerId(userId);
    }

    public String saveMascot(RegisterMascotForm registerMascotForm){
        Mascot mascot = new Mascot(
                null,
                registerMascotForm.getMascot_name(),
                registerMascotForm.getSpecies(),
                registerMascotForm.getRace(),
                registerMascotForm.getBirthDate(),
                registerMascotForm.getOwner_id()
                );
        mascotRepo.save(mascot);
        return "Ok";
    }

}
