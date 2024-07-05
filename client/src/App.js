import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; // Importar Navigate
import React, { useEffect, useState } from 'react';
import Socios from './components/Socios';
import SociosAgregar from './components/SociosAgregar';
import SocioOnly from './components/SocioOnly';
import PersonaOnly from './components/PersonaOnly';
import Empresa from './components/Empresa';
import EmpresaAgregar from './components/EmpresaAgregar';
import Login from './components/Login';
import Sidebar from './components/Sidebar';

function App() {
  const [user, setUser] = useState(null); // Cambiado a null para un mejor manejo de estado inicial

  useEffect(() => {
    document.title = "Sitrach | Sistema";
  }, []);


  return (
    <BrowserRouter>
      <div >
        {!user ? ( // Si user es null, muestra el componente de Login
          <Login setUser={setUser} />
        ) : ( // Si user no es null, muestra el Sidebar y las rutas protegidas
          <>
            <Sidebar />
            <div>
              <Routes>
                <Route path="/socios" element={<Socios />} />
                <Route path="/SociosAgregar" element={<SociosAgregar />} />
                <Route path="/socioOnly" element={<SocioOnly />} />
                <Route path="/personaOnly" element={<PersonaOnly />} />
                <Route path="/empresa" element={<Empresa />} />
                <Route path="/EmpresaAgregar" element={<EmpresaAgregar />} />
                <Route path="*" element={<Navigate to="/socios" />} /> {/* Redirigir a /socios si no se encuentra la ruta */}
              </Routes>
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
