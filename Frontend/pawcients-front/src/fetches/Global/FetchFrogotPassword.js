export async function fetchPasswordReset(email) {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/passwordreset`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }
  );

  const data = await response.json();

  return data;
}
