export async function addAppointment(mascotName, species, race, birthDate, vetId) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://127.0.0.1:8080/vet/${vetId}/appointment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ mascotName, species, race, birthDate }),
      }
    );
    return response;
  }