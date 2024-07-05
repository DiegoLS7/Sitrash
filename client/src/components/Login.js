import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login({ setUser }) {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { Usuario: usuario, Clave: clave })
      .then(response => {
        if (response.data.success) { // Verifica si la respuesta indica éxito
          setUser(usuario); // Actualiza el estado del usuario en App.js
        } else {
          setMessage(response.data.message);
        }
      })
      .catch(error => {
        setMessage(error.response?.data?.message || 'Error en el servidor');
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="TituloLabel">
              <label>Usuario</label>
            </div>
            <input
              type="text"
              placeholder="Nombre de Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <div className="TituloLabel">
              <label>Contraseña</label>
            </div>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Clave secreta"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={toggleShowPassword}
                className="toggle-password"
              />
            </div>

            <button className='BotonIngresar' type="submit">INGRESAR</button>
          </form>
          {message && (
            <div className="message-container">
              <p className="message">{message}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Login;
