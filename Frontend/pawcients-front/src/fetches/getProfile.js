export async function fetchProfile(token) {
  const response = await fetch("http://127.0.0.1:8080/getprofile", {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error en la solicitud de perfil");
  }

  return await response.json();
}
