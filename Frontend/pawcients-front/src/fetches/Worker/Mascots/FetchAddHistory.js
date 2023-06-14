export async function fetchAddHistoryVaccine({ history, mascotID }) {
  const response = await fetch(
    "http://127.0.0.1:8080/mascot/" + mascotID + "/history",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        visitNotes: history.visitNotes,
        vaccineName: history.vaccineName,
        vaccineRenewal: history.vaccineRenewal,
      }),
    }
  );
  const data = await response.json();
  return data;
}

export async function fetchAddHistorySurgery({ history, mascotID }) {
  const response = await fetch(
    "http://127.0.0.1:8080/mascot/" + mascotID + "/history",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        visitNotes: history.visitNotes,
        surgeryName: history.surgeryName,
      }),
    }
  );
  const data = await response.json();
  return data;
}

export async function fetchAddHistoryDeworming(history, mascotID) {
  const response = await fetch(
    "http://127.0.0.1:8080/mascot/" + mascotID + "/history",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        visitNotes: history.visitNotes,
        dewormingName: history.dewormingName,
      }),
    }
  );
  const data = await response.json();
  return data;
}
export async function fetchAddHistoryCheckup(history, mascotID) {
  const response = await fetch(
    "http://127.0.0.1:8080/mascot/" + mascotID + "/history",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        visitNotes: history.visitNotes,
      }),
    }
  );
  const data = await response.json();
  return data;
}
