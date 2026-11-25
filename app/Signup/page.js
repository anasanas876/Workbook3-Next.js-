"use client";


import styles from "./Signup.module.css"

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
        "https://workbook2-module2-3.onrender.com/showcompanies/"
      );

      const data = await response.json();
      

      setCompanies(data.data);
    }

    GetCompanies();
  }, []);

  // Signup
  async function Signup() {
    const response = await fetch(
      "https://workbook2-module2-3.onrender.com/signup/",
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

    {/*console.log(data);*/}

    if (response.ok) {
      setMessage("Signup successful!");
    } else {
      setMessage(
        "Signup failed: " + JSON.stringify(data.data)
      );
    }
  }

  return (
    <div className={styles.page}>
    <div className={styles.card}>
      <h1 className={styles.title}>Signup</h1>
      <p className={styles.subtitle}>Sign Up  to Real Time Collaboration Platform</p>
      

      <input className={styles.input}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input className={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input className={styles.input}
  
  type="text"
  value="employee"
  readOnly
/>

      <select className={styles.input}
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      >
        <option value="">Select Company</option>

        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.company_name}
          </option>
        ))}
      </select>

      <button className={styles.button} onClick={Signup}>
        Signup
      </button>

      <p>{message}</p>
    </div>
    </div>
  );
}