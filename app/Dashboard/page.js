"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { access } from "fs";

export default function Dashboard() {
    const router = useRouter();

    const [username, setUsername] = useState("");

    useEffect(() => {
        const access = localStorage.getItem("access");
        const name = localStorage.getItem("username");

        if (!access) {
            router.push("/Login");
        } else {
            setUsername(name || "");
        }
    }, [router]);

    return (
        <div>
            <div style={{ paddingTop: "30px", paddingLeft: "30px" }}>
                <h3>Welcome, {username}</h3>
            </div>

            <ShowProjects />
        </div>
    );
}

function ShowProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function FetchProjects() {
            setLoading(true);

            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/showprojects",
                    {
                        method:"GET",
                        headers:{
                            "Authorization": `Bearer${access}`,
                            "Content-Type": "application/json"
                        }
                    }
                    
                );

                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                } else {
                    setProjects([]);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        }

        FetchProjects();
    }, []);

    if (loading) {
        return <p>Loading projects...</p>;
    }

    if (projects.length === 0) {
        return <p>No projects found.</p>;
    }

    return (
        <div>
            <h3>Projects List</h3>

            {projects.map((project) => (
                <div key={project.id}>
                    <p>{project.name}</p>
                </div>
            ))}
        </div>
    );
}

<div>
    <div style={{ paddingTop: 20, position: "absolute", top: 20, right: 20 }}>
        <button
            style={{ color: "red" }}
            onClick={() => {
                localStorage.removeItem("access");
                localStorage.removeItem("username");
                router.push("/login");
            }}
        >
            LogOut
        </button>
    </div>
</div>