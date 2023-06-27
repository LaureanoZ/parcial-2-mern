import React from 'react';
import './stylesPages/Error404Page.css';

function Error404Page() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">Oops!</h1>
        <p className="error-message">Parece que te has perdido en el camino.</p>
        <p className="error-suggestion">Puedes intentar:</p>
        <ul className="error-suggestion-list">
          <li>Regresar a la página de inicio</li>
          <li>Verificar la URL ingresada</li>
          <li>Buscar en nuestro sitio web</li>
        </ul>
      </div>
    </div>
  );
}

export default Error404Page;