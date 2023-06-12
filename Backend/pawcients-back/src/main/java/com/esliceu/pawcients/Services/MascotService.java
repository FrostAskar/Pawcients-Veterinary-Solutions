package com.esliceu.pawcients.Services;

import com.esliceu.pawcients.Exceptions.NotFoundMascotException;
import com.esliceu.pawcients.Exceptions.NotFoundUserException;
import com.esliceu.pawcients.Exceptions.UnauthorizedUserException;
import com.esliceu.pawcients.Exceptions.UnverifiedUserException;
import com.esliceu.pawcients.Forms.FindMascotForm;
import com.esliceu.pawcients.Forms.RegisterMascotForm;
import com.esliceu.pawcients.Forms.UpdateMascotForm;
import com.esliceu.pawcients.Models.Mascot;
import com.esliceu.pawcients.Models.User;
import com.esliceu.pawcients.Repos.MascotRepo;
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
        return mascotRepo.findById(mascotId).get();
    }

    public Mascot findMascotByIdAndOwnerId(String mascotId, String clientId) {
        // TODO Query it with the parameter clientid too (Same query only one result)
        List<Mascot> mascots = mascotRepo.findById(mascotId).stream().toList();
        System.out.println(mascotId + " " + clientId);
        if (mascots.size() < 1) {
            throw new NotFoundMascotException("This is not a valid mascot");
        }
        return mascots.get(0);
    }

    public List<Mascot> findMascotsByUser(String userId, User actualUser) {
        if(userService.userRepo.findById(userId).isEmpty())
            throw new NotFoundUserException("User not found");
        if(!actualUser.getVerificationCodeEmailCheck())
            throw new UnverifiedUserException("User is not verified");
        if(actualUser.getType().equals("client") && !actualUser.getId().equals(userId))
            throw new UnauthorizedUserException("User is not authorized");
        return mascotRepo.findByOwnerId(userId);
    }

    public String saveMascot(RegisterMascotForm registerMascotForm, String ownerId, User actualUser){
        if(userService.userRepo.findById(ownerId).isEmpty())
            throw new NotFoundUserException("User not found");
        if(!actualUser.getVerificationCodeEmailCheck())
            throw new UnverifiedUserException("This user is not verified");
        if(actualUser.getType().equals("client") && !actualUser.getId().equals(ownerId))
            throw new UnauthorizedUserException("User not allowed to create mascots for another client");
        Mascot mascot = new Mascot(
                null,
                actualUser.getClinicId(),
                registerMascotForm.getMascotName(),
                registerMascotForm.getSpecies(),
                registerMascotForm.getRace(),
                registerMascotForm.getBirthDate(),
                ownerId
                );
        return mascotRepo.save(mascot).getId();
    }

    public List<Mascot> findMascotsByClinic(String clinicId) {
        return mascotRepo.findByClinicId(clinicId);
    }

    public Mascot updateMascotInfo(Mascot mascotToUpdate, UpdateMascotForm updateMascotForm) {
        mascotToUpdate.setAge(updateMascotForm.getAge());
        mascotToUpdate.setGender(updateMascotForm.getGender());
        mascotToUpdate.setWeight(updateMascotForm.getWeight());
        mascotToUpdate.setColor(updateMascotForm.getColor());
        mascotToUpdate.setIdentificationSerial(updateMascotForm.getIdentificationNumber());
        return mascotToUpdate;
    }

    public void updateMascot(Mascot mascotToUpdate) {
        mascotRepo.save(mascotToUpdate);
    }
}
