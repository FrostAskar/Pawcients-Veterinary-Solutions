export async function fetchSignup(
  name,
  surname,
  email,
  phone,
  license,
  password,
  clinicName,
  clinicAddress,
  clinicZipCode,
  clinicPhoneNumber
) {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/signup/admin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        phone,
        license,
        password,
        clinicName,
        clinicAddress,
        clinicZipCode,
        clinicPhoneNumber,
      }),
    }
  );

  return response;
}
