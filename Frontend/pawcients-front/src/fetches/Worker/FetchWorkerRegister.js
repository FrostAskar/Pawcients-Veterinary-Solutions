export async function fetchWorkerRegister(name, surname, email, phone, license, type) {
  const password = "password";
  const token = localStorage.getItem('token');
    const response = await fetch("http://127.0.0.1:8080/vet/worker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ name, surname, email, phone, license, type, password}),
    });

    return response.json();;
  }
  