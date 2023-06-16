export async function fetchLogin(email, password) {
  const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  console.log(process.env.REACT_APP_API_ENDPOINT);
  const data = await response.json();

  localStorage.setItem("token", data.token);
  if (data.user.type === "vet" || data.user.type === "admin") {
    window.location.href = "/vetdashboard";
  } else if (data.user.type === "client") {
    window.location.href = "/clientdashboard";
  }

  return data;
}
