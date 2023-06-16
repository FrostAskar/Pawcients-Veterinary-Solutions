export async function updateAppoitment(startDate, endDate, typeAppointment, appointmentId) {
    const response = await fetch(
      `http://127.0.0.1:8080/vet/appointment/${appointmentId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate, typeAppointment })
      }
    );
    return response;
  }