export async function addMascot(mascotName, species, breed, birthDate, gender, clientID) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://127.0.0.1:8080/client/${clientID}/mascot`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ mascotName, species, breed, birthDate, gender}),
    }
  );

  return response;
}

export async function putMascotData(clientID, mascotID, editedAnimalData) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `http://127.0.0.1:8080/client/${clientID}/mascot/${mascotID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(editedAnimalData),
    }
  );

  return response;
}
