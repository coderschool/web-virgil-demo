import React, { useState } from "react";

function FormControl() {
  const [formData, setFormData] = useState({
    username: "minhdh",
    email: "minhdh@gmail.com",
    language: "VN",
    isGoing: false,
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate username
    const isUsernameValid =
      formData.username === formData.username.toLowerCase();
    setError(!isUsernameValid ? "Username must be lowercase" : "");
  };

  const handleInputChange = (e) => {
    const field = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (field === "username") {
      const isUsernameValid = value === value.toLowerCase();
      setError(!isUsernameValid ? "Username must be lowercase" : "");
    }
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div>
      <p>{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            type="text"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="text"
            autoComplete="off"
          />
        </div>
        <div>
          <label>
            Language{" "}
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
            >
              <option value="VN">VN</option>
              <option value="EN">EN</option>
              <option value="DE">DE</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            <input
              id="isGoing"
              name="isGoing"
              type="checkbox"
              checked={formData.isGoing}
              onChange={handleInputChange}
            />
            Is going?
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormControl;
