export async function fetchClientRegister(name, surname, email, phone) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/vet/client`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name, surname, email, phone }),
    }
  );

  return response;
}
