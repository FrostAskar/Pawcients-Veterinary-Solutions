export async function FetchWorker() {
    const token = localStorage.getItem('token');
    const response = await fetch("http://127.0.0.1:8080/vet/client", {
      method: "POST",
      headers: {
        Authorization: token
      }
    });
  
    if(response.ok) {
        const data = await response.json();
        console.log(data);
    }
    return data;
  }