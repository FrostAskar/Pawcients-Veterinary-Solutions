export async function deleteAppointment(vetId, appointmentId) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/vet/${vetId}/appointment/${appointmentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response;
}
