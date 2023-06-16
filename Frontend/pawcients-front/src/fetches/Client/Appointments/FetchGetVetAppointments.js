export async function getVetAppointments(vetId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/client/vet/${vetId}/appointment`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Appointments request failed");
    } else if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error("Appointments request failed");
  }
}
