import React, { useState, useEffect } from "react";
import "css/common/profilesettings.scss";
import "css/vet/vetHome.scss";
import SideNavbarClient from "Routes/Client/SideNavbarClient";
import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import { fetchProfile } from "fetches/Global/getProfile";


const ProfileSettings = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      const profileData = await fetchProfile();
      setProfileData(profileData);
    };

    getProfileData();
  }, []);

  const handlePasswordChange = () => {
    // Lógica para cambiar la contraseña
    if (newPassword === confirmPassword) {
      // Realizar la actualización de la contraseña en el backend
      console.log("Contraseña cambiada con éxito");
    } else {
      console.log("Las contraseñas no coinciden");
    }
  };

  const handleProfileImageChange = (event) => {
    // Lógica para cambiar la foto de perfil
    const imageFile = event.target.files[0];
    // Realizar la carga de la imagen al backend
    console.log("Foto de perfil cambiada con éxito");
    setProfileImage(URL.createObjectURL(imageFile));
  };

  return (
    <div className="dashboard">
      {((profileData?.type === "vet") || (profileData?.type === "aux") || (profileData?.type === "admin")) ? (
        <SideNavbarWorker />
      ) : (
        <SideNavbarClient />
      )}
      <div className="showbuttons">
        <div className="profile-image-change">
          <h3>Change Profile Picture</h3>
          <input type="file" onChange={handleProfileImageChange} />
          {profileImage && <img src={profileImage} alt="Profile" />}
        </div>
        <div className="password-change">
          <h3>Change Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="clasic-button" onClick={handlePasswordChange}>Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
