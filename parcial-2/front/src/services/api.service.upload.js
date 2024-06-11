export async function call({ uri, method = 'GET', body = undefined }) {
    const headers = {
      'auth-token': localStorage.getItem('token'),
    };
  
    // Si body es un objeto FormData, no establecer el Content-Type en los headers
    let requestBody = body;
    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
      requestBody = JSON.stringify(body);
    }
  
    return fetch(`http://localhost:2222/api/${uri}`, {
      method: method,
      headers: headers,
      body: requestBody,
    })
    .then(async response => {
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
        }
        throw await response.json();
      }
      // Aquí asumimos que si la respuesta es correcta, siempre viene en formato JSON,
      // si tu endpoint devuelve otra cosa (como texto plano o binario para descargas) 
      // necesitarás manejarlo de acuerdo al caso.
      return response.json();
    });
  }
  
  export default {
    call,
  };
  