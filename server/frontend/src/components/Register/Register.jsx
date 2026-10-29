```jsx
import React, { useState } from "react";
import "./Register.css";

import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";

const Register = () => {
  // State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  // Redirect to home
  const gohome = () => {
    window.location.href = window.location.origin;
  };

  // Handle form submission
  const register = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const register_url =
        window.location.origin + "/djangoapp/register";

      const res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
        }),
      });

      const json = await res.json();

      if (res.ok && json.status) {
        sessionStorage.setItem("username", json.userName);
        window.location.href = window.location.origin;
      } else if (json.error === "Already Registered") {
        setError("This username is already registered.");
      } else {
        setError(
          json.error || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
    }
  };

  return (
    <div className="register_container" style={{ width: "50%" }}>
      <div
        className="header"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span className="text" style={{ flexGrow: "1" }}>
          Sign-up
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifySelf: "end",
            alignSelf: "start",
          }}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              gohome();
            }}
            style={{
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
            aria-label="Close registration"
          >
            <img
              style={{ width: "1cm" }}
              src={close_icon}
              alt="Close"
            />
          </a>
        </div>
      </div>

      <hr />

      <form onSubmit={register}>
        <div className="inputs">
          {/* Username */}
          <div className="input">
            <img
              src={user_icon}
              className="img_icon"
              alt="Username"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input_field"
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/* First Name */}
          <div className="input">
            <img
              src={user_icon}
              className="img_icon"
              alt="First Name"
            />
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="input_field"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="input">
            <img
              src={user_icon}
              className="img_icon"
              alt="Last Name"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="input_field"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="input">
            <img
              src={email_icon}
              className="img_icon"
              alt="Email"
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input_field"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input">
            <img
              src={password_icon}
              className="img_icon"
              alt="Password"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input_field"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p
            role="alert"
            style={{ color: "red", textAlign: "center" }}
          >
            {error}
          </p>
        )}

        <div className="submit_panel">
          <input
            className="submit"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
```
