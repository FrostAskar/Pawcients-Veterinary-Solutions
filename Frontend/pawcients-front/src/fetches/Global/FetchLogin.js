export async function fetchLogin(email, password) {
  const fetchUrl = process.env.REACT_APP_API_ENDPOINT;
  const response = await fetch(`http://127.0.0.1:8080/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  console.log(fetchUrl);
  const data = await response.json();

  localStorage.setItem("token", data.token);
  if (data.user.type === "vet" || data.user.type === "admin") {
    window.location.href = "/vetdashboard";
  } else if (data.user.type === "client") {
    window.location.href = "/clientdashboard";
  }

  return data;
}
