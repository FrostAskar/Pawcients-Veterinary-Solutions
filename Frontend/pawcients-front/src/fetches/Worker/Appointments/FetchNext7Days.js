export async function fetchNext7Days() {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/vet/appointmentgraph`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}
