export async function fetchSignup(vetName, email, licenseNumber, password, clinicName, streetAddress, streetNumber, 
    city, country ) {
    const response = await fetch("http://127.0.0.1:8080/signup/vet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vetName, email, licenseNumber, password, clinicName, streetAddress, streetNumber, city, country}),
    });
  
    const data = await response.json();
    return data;
  }