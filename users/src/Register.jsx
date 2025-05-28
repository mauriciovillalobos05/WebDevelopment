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



// import register from "./assets/"
const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    // lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newForm = {
      ...form,
      [name]: value,
    };

    setForm(newForm);
  };

  return (
    <>
      <div>Register</div>
      <div style={{ display: 'flex' }}>
        <div>{/* <img src={register} /> */}</div>
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={form.name}
            />
          </label>
          {/* <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={form.name}
            />
          </label> */}
          <label>
            Email:
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={form.name}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={form.name}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default Register;