export async function fetchLoginWorker(email, password) {
  const response = await fetch("http://127.0.0.1:8080/login/vet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
}

export async function fetchLoginClient(email, password) {
  const response = await fetch("http://127.0.0.1:8080/login/client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
}
