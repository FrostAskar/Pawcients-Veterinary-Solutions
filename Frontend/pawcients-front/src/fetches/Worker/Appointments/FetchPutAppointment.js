export async function FetchPutAppoinment(appointmentId, completed) {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/vet/appointment/${appointmentId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: completed,
      }),
    }
  );
  return response;
}
