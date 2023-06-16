import React, { useState, useEffect } from "react";
import "css/common/profilesettings.scss";
import "css/vet/vetHome.scss";
import SideNavbarClient from "Routes/Client/SideNavbarClient";
import SideNavbarWorker from "Routes/Worker/SideNavbarWorker";
import { fetchProfile } from "fetches/Global/getProfile";
import {
  putSaveProfileData,
  putChangePassword,
} from "fetches/Global/PutSaveProfileData";

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

  const handlePasswordChange = async () => {
    // Lógica para cambiar la contraseña
    if (newPassword === confirmPassword) {
      const response = await putChangePassword(
        profileData?.id,
        password,
        newPassword,
        confirmPassword
      );
      if (response.status === 200) {
        console.log("Password changed successfully");
      }
    } else {
      console.log("Passwords don't match");
    }
  };
  const handleProfileImageChange = (event) => {
    // Lógica para cambiar la foto de perfil
    const imageFile = event.target.files[0];
    // Realizar la carga de la imagen al backend
    console.log("Foto de perfil cambiada con éxito");
    setProfileImage(URL.createObjectURL(imageFile));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveProfileData = () => {
    putSaveProfileData(
      profileData?.id,
      profileData?.name,
      profileData?.surname,
      profileData?.phone,
      profileImage
    ).then((response) => {
      if (response.status === 200) {
        window.location.href = "/profilesettings";
      } else {
        console.log("Failed to save profile data");
      }
    });
  };

  return (
    <div className="dashboard">
      {profileData?.type === "vet" ||
        profileData?.type === "aux" ||
        profileData?.type === "admin" ? (
        <SideNavbarWorker />
      ) : (
        <SideNavbarClient />
      )}
      <div className="showbuttons">
        <div className="section">
          <div className="section-content">
            <div className="profile-image-change">
              <h3>Change Profile Picture</h3>
              <input type="file" onChange={handleProfileImageChange} />
              {profileImage && <img src={profileImage} alt="Profile" />}

              <h3>Change Profile Settings</h3>
              <span>Email:</span>
              <input
                type="text"
                placeholder="Email"
                value={profileData?.email}
                disabled
              />
              <span>Name: </span>
              <input
                type="text"
                placeholder="Name"
                value={profileData?.name}
                name="name"
                onChange={handleChange}
              />
              <span>Surname: </span>
              <input
                type="text"
                placeholder="Surname"
                value={profileData?.surname}
                name="surname"
                onChange={handleChange}
              />
              <span>Phone: </span>
              <input
                type="text"
                placeholder="Phone"
                value={profileData?.phone}
                name="phone"
                onChange={handleChange}
              />

              <button className="clasic-button" onClick={saveProfileData}>
                Save Profile Data
              </button>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="section-content">
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
              <button className="clasic-button" onClick={handlePasswordChange}>
                Change Password
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProfileSettings;
