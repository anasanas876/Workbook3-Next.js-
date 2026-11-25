"use client";
import { useState, useEffect } from "react";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function FetchData(accessToken,company_id) {
      try {
        // 1. Get initial access token
        let accessToken = localStorage.getItem("access");

        let response = await fetch(`https://workbook2-module2-3.onrender.com/projects/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        
        if (response.status === 401) {
          const refreshToken = localStorage.getItem("refresh");
          
          const refreshResponse = await fetch("https://workbook2-module2-3.onrender.com/refreshtoken", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (response.status===403){
            alert("Unauthorized Request")
          }

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem("access", refreshData.access);
            accessToken = refreshData.access;

            // Retry the original request with the new token
            response = await fetch("https://workbook2-module2-3.onrender.com/projects/", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          } else {
            throw new Error("Session expired. Please log in again.");
          }
        }

        // 3. Parse and set data
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const result = await response.json();
        // Adjust 'result.data' or 'result' depending on your Django API structure
        setProjects(result.data || result); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    FetchData();
  }, []);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id}>
            <h1>{project.title}</h1>
          </div>
        ))
      )}
    </div>
  );
}
