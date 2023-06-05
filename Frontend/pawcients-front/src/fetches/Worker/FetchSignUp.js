export async function fetchSignup(name, surname, email, phone, license, password, clinicName, clinicAddress, clinicZipCode, clinicPhoneNumber ) {
    const response = await fetch("http://127.0.0.1:8080/signup/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, email, phone, license, password, clinicName, clinicAddress, clinicZipCode, clinicPhoneNumber}),
    });

    const data = await response.json();

    if(response.status === 200) {
      window.location.href = "/login";
    }
   
    return data;
  }

