export async function fetchMascotData(clientID, mascotID) {
  const response = await fetch(
    "http://localhost:8080/client/" + clientID + "/mascot/" + mascotID,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  const data = await response.json();
  return data;
}
export async function fetchMascotDataVet(mascotID) {
  const response = await fetch("http://localhost:8080/mascot/" + mascotID, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchMascotDataVetHistory(mascotID) {
  const response = await fetch(
    "http://localhost:8080/mascot/" + mascotID + "/history",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  const data = await response.json();
  return data;
}
export async function fetchMascotDataChangeProfileInfo(
  mascotid,
  editedAnimalData
) {
  const response = await fetch("http://localhost:8080/mascot/" + mascotid, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      photo: editedAnimalData.image,
      species: editedAnimalData.species,
      breed: editedAnimalData.breed,
      birthDate: editedAnimalData.birthDate,
      gender: editedAnimalData.gender,
      weight: editedAnimalData.weight,
      color: editedAnimalData.color,
      identificationNumber: editedAnimalData.identificationNumber,
    }),
  });
  const data = await response.json();
  return data;
}
