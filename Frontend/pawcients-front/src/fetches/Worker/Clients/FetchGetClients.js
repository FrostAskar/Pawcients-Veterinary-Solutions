export async function getClients() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://127.0.0.1:8080/vet/clients", {
        method: "GET",
        headers: {
          Authorization: token
        }
      });
  
      if (!response.ok) {
        throw new Error("Clients request failed");
      } else if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      throw new Error("Clients request failed");
    }
  }