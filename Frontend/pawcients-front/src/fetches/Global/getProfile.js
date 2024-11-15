export async function fetchProfile() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/getprofile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Profile request failure");
    } else if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error("Profile request failure");
  }
}
