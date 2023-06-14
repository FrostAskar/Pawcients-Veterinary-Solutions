export async function fetchGetHistory(mascotID) {
  const response = await fetch(
    "http://localhost:8080/vet/mascot/" + mascotID + "/history",
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
