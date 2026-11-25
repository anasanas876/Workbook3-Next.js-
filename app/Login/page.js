"use client";

import link from 'next/link';
import styles from "./Login.module.css";


 function Dashboard()
{
  return(
    <nav>
  <link href="/">Go to Dashboard page</link>
  </nav>)
}


import { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError]=useState(false)
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("https://workbook2-module2-3.onrender.com/login/", {
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

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("username", username);
        localStorage.setItem("company_id", data.company_id)
        localStorage.setItem("role",data.role)
        router.push("/Dashboard");}
      else {
        alert(data.details)
        alert("Please Login again")
        router.push("Login")

      }
      
    
    } finally {
      setLoading(false);
    }
  }

 return (
  <div className={styles.page}>
    <div className={styles.card}>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.subtitle}>Log in to your workspace</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>
          Log in
        </button>
      </form>
    </div>
  </div>
);
}


export default Login;

