export async function addMascot(
  mascotName,
  species,
  breed,
  birthDate,
  gender,
  clientID
) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/client/${clientID}/mascot`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ mascotName, species, breed, birthDate, gender }),
    }
  );

  return response;
}

export async function putMascotData(clientID, mascotID, editedAnimalData) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/client/${clientID}/mascot/${mascotID}`,
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
