export async function fetchAddHistory({ history, mascotID, type }) {
  const response = await fetch(
    "http://localhost:8080/vet/mascot/" + mascotID + "/history",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        mascot_id: mascotID,
        type: type,
        type_title: history.type_title,
        desc: history.desc,
        date: history.date,
      }),
    }
  );
  const data = await response.json();
  return data;
}
