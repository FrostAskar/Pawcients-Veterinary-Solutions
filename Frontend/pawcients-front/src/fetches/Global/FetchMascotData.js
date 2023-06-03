export async function fetchMascotData(mascotID) {
  const response = await fetch("http://localhost:8080/mascot/" + mascotID, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const data = await response.json();
  return data;
}
