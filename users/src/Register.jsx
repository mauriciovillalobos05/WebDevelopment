import React, { useState } from "react";
import './styles.css';

export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    mail: "",
    password: "",
    client: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

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
            name="mail"
            onChange={handleChange}
            value={form.mail}
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
        <label>
          Cliente:
          <input
            type="text"
            name="client"
            onChange={handleChange}
            value={form.client}
          />
        </label>
      </div>
    </div>
  );
};

export default Register;
