export async function fetchWorkerRegister(
  name,
  surname,
  email,
  phone,
  license,
  type
) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/vet/worker`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name, surname, email, phone, license, type }),
    }
  );

  return response;
}
