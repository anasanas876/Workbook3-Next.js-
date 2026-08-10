// Redirecting unauthenticated users
import { redirect } from 'next/navigation'
import { auth } from '@/auth' // Example helper from Auth.js / NextAuth




"use client";

import { useState, useEffect } from "react";

// Showing logged in User name on Dashboard page
function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  

  return (
    <div>
      <h1>Welcome, {username}</h1>

      {}
    </div>
  );
}

export default Dashboard;