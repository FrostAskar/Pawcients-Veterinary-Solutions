export async function addAppointment(clientId, mascotId, workerId, typeAppointment, startDate, endDate, vetId) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://127.0.0.1:8080/vet/${vetId}/appointment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ clientId, mascotId, workerId, typeAppointment, startDate, endDate }),
      }
    );
    return response;
  }