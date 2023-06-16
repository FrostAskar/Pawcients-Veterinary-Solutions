export async function addAppointment(
  clientId,
  mascotId,
  workerId,
  typeAppointment,
  startDate,
  endDate
) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/client/${clientId}/appointment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        clientId,
        mascotId,
        workerId,
        typeAppointment,
        startDate,
        endDate,
      }),
    }
  );
  return response;
}
