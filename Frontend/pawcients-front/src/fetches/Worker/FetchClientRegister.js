export async function fetchClientRegister(name, surname, email, phone) {
  const password = "password";
  const token = localStorage.getItem('token');
    const response = await fetch("http://127.0.0.1:8080/vet/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ name, surname, email, phone, password}),
    });
  
    return response.json();
  }
  