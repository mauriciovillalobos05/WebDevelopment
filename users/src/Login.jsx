import React, { useState } from "react";
import './styles.css';
import { authFlow, getDataAuth } from './setup';

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSetup = async () => {
    try {
      const codeChallenge = await getDataAuth();  // Espera a que se genere y se guarde
      const codeVerifier = localStorage.getItem('code_verifier');

      if (!codeVerifier) {
        throw new Error("No se pudo guardar el code_verifier");
      }

      console.log("Code Challenge:", codeChallenge);
      authFlow(codeChallenge);
    } catch (err) {
      console.error("Error en handleSetup:", err);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Guarda el token JWT que viene de tu backend
        localStorage.setItem('jwt_token', data.token);
        console.log("Login exitoso, token JWT guardado:", data.token);

        // Opcional: continuar con tu lógica de autenticación adicional
        await handleSetup();
      } else {
        console.error("Error en login:", data.error);
      }
    } catch (err) {
      console.error("Error de red:", err);
    }
  };

  return (
    <div className="rpage-container">
      <div className="register-container">
        <h1>Bienvenido</h1>
        <h2>Cactus Jack</h2>
      </div>

      <div className="register-container">
        <h1>Login</h1>

        <label>
          Correo:
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={form.email} 
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
        </label>

        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
