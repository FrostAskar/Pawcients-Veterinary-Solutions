export async function addMascot(name, species, race, birthDate, clientID) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:8080/client/${clientID}/mascot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ name, species, race, birthDate}),
    });

    return response;
}


