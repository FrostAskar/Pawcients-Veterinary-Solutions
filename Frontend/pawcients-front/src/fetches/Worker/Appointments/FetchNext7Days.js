export async function fetchNext7Days() {
  const response = await fetch("http://localhost:8080/vet/appointmentgraph", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
