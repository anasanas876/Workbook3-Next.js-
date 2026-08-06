"use client";

import { useState } from "react";
import handleLogout from "../../components/COMPONENTS.JS";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log("Login Successful");
      // Storing tokens in local storage to be accessible by other components of code
        const accessToken = localStorage.setItem("access", data.access);
        const refreshToken = localStorage.setItem("refresh", data.refresh);

       
      }
    } 
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button type="submit">Login</button>
    </form>
  );


export default Login;

// Adding Logout button
<button onClick={handleLogout}>Logout</button>