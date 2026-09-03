"use client";

import { useState, useEffect } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState("");

  // Get Companies
  useEffect(() => {
    async function GetCompanies() {
      const response = await fetch(
        "http://127.0.0.1:8000/showcompanies/"
      );

      const data = await response.json();
      console.log(data);

      setCompanies(data.data);
    }

    GetCompanies();
  }, []);

  // Signup
  async function Signup() {
    const response = await fetch(
      "http://127.0.0.1:8000/signup/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          email,
          password,
          role,
          company: Number(company),
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setMessage("Signup successful!");
    } else {
      setMessage(
        "Signup failed: " + JSON.stringify(data.data)
      );
    }
  }

  return (
    <div>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <select
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      >
        <option value="">Select Company</option>

        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>

      <button onClick={Signup}>
        Signup
      </button>

      <p>{message}</p>
    </div>
  );
}