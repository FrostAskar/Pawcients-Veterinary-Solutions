export async function fetchProfile(token) {
  const response = await fetch("http://127.0.0.1:8080/getprofile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}
