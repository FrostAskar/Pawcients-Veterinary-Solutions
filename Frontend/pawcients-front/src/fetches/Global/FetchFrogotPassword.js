export async function fetchPasswordReset(email) {
  const response = await fetch("http://localhost:8080/passwordreset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });

  const data = await response.json();

  return data;
}
