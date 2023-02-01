import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" autoComplete="off" {...register("username")} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            autoComplete="off"
            {...register("email", { required: true })}
          />
          {errors.email && <p>Email is required</p>}
        </div>
        <div>
          <label>
            Language{" "}
            <select {...register("language")}>
              <option value="VN">VN</option>
              <option value="EN">EN</option>
              <option value="DE">DE</option>
            </select>
          </label>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
