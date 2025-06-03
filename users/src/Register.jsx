import React, { useState } from "react";
import './styles.css';
import { spotifyAPI } from "../spotifyAPI.js";

export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newForm = {
      ...form,
      [name]: value,
    };

    setForm(newForm);
  };

  const handleRegistro = async() => {
    const url = "http://localhost:3000/api/users";
    console.log(form)
    const data = JSON.stringify(form);
    const res = await spotifyAPI(url, 'POST', data, null);
    console.log(res);
  }

  return (
    <div className="rpage-container">
      <div className="register-container">
        <h1>Bienvenido</h1>
        <h2>Cactus Jack</h2>
      </div>

      <div className="register-container">
        <h1>Regístrate</h1>

        <label>
          Nombre:
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={form.name}
          />
        </label>

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
          <button onClick={handleRegistro}>Registrar</button>
        </div>
      </div>
    </div>
  );
};

export default Register;