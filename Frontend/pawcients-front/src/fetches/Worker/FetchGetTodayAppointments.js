export async function getTodayAppointments() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://127.0.0.1:8080/vet/appointments", {
        method: "GET",
        headers: {
          Authorization: token
        }
      });
  
      if (!response.ok) {
        throw new Error("Today appointments request failed");
      } else if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      throw new Error("Today appointments request failed");
    }
  }