export async function getAllAppointments(vetId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8080/vet/${vetId}/appointment`, {
        method: "GET",
        headers: {
          Authorization: token
        }
      });
  
      if (!response.ok) {
        throw new Error("Appointments request failed");
      } else if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      throw new Error("Appointments request failed");
    }
  }