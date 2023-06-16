export async function fetchMascotData(clientID, mascotID) {
  const response = await fetch(
    process.env.REACT_APP_API_ENDPOINT +
      "/client/" +
      clientID +
      "/mascot/" +
      mascotID,
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
  const response = await fetch(
    process.env.REACT_APP_API_ENDPOINT + "/mascot/" + mascotID,
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

export async function fetchMascotDataVetHistory(mascotID) {
  const response = await fetch(
    process.env.REACT_APP_API_ENDPOINT + "/mascot/" + mascotID + "/history",
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
  const response = await fetch(
    process.env.REACT_APP_API_ENDPOINT + "/mascot/" + mascotid,
    {
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
    }
  );
  const data = await response.json();
  return data;
}
