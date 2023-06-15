export async function putSaveProfileData(
  clientID,
  name,
  surname,
  phone,
  image
) {
  const response = await fetch("http://localhost:8080/profilesettings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      client_id: clientID,
      name: name,
      surname: surname,
      phone: phone,
      photo: image,
    }),
  });

  const data = await response();
  return data;
}
export async function putChangePassword(
  clientID,
  currentpassword,
  newpassword
) {
  const response = await fetch(
    "http://localhost:8080/profilesettings/changepassword",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        client_id: clientID,
        currentpassword: currentpassword,
        newpassword: newpassword,
      }),
    }
  );

  const data = await response();
  return data;
}
