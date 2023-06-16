export async function deleteAppointment(clientId, appointmentId) {
    const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8080/client/${clientId}/appointment/${appointmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
      });
      return response.json();;
    }