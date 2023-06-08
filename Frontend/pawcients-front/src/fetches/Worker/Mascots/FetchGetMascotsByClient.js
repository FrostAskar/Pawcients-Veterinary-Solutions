export async function getMascotsByClient(clientID) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch( `http://127.0.0.1:8080/client/${clientID}/mascot`, {
        method: "GET",
        headers: {
          Authorization: token
        }
      });
  
      if (!response.ok) {
        throw new Error("Mascots request failed");
      } else if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      }
    } catch (error) {
      throw new Error("Mascots request failed");
    }
  }