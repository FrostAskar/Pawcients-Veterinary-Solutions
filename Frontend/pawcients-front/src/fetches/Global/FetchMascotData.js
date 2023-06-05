export async function fetchMascotData(clientID, mascotID) {
  const response = await fetch(
    "http://localhost:8080/client/" + clientID + "/mascot/" + mascotID,
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
