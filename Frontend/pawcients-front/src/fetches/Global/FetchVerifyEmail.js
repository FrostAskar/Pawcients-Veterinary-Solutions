export async function fetchVerifyEmail(confirmationCode) {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/verifyemail`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        code: confirmationCode,
      }),
    }
  );

  const data = await response.json();
  return data;
}
