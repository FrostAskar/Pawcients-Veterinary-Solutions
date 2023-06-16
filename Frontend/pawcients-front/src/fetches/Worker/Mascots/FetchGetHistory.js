export async function fetchGetHistory(mascotID) {
  const response = await fetch(
    process.env.REACT_APP_API_ENDPOINT + "/vet/mascot/" + mascotID + "/history",
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
