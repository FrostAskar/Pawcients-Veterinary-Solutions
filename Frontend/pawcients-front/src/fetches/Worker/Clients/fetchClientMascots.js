export async function fetchClientMascots(clientID) {
  const response = await fetch(
    "http://localhost:8080/client/" + clientID + "/mascots",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  const data = await response.json();
  return data;
}
