export async function fetchClientMascots(clientID) {
  const response = await fetch(
    process.env.REACT_APP_API_ENDPOINT + "/client/" + clientID + "/mascots",
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
