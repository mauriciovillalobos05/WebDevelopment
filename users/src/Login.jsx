import React, { useState } from "react";

export const Login = () => {
  const [form, setForm] = useState({
    mail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    const newForm = {
        ...form,
        [name]:value
    }
    setForm(newForm);
  }

  return (
    <>
      <div>Login</div>
      <label>
        Mail:
        <input
          type="text"
          name="mail"
          onChange={handleChange}
          value={form.name}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          name="password"
          onChange={handleChange}
          value={form.name}
        />
      </label>
    </>
  );
};

export default Login;
