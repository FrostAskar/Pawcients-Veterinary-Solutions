export async function fetchProfile() {
  try {
    const token = localStorage.getItem("token");
    console.log("this is token: " + token);
    const response = await fetch("http://localhost:8080/getprofile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

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
