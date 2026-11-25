
//import getWorkspaces from '@/components/getWorkspaces';

"use client";
import styles from "@/components/Notes.module.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";










export default function Dashboard() {

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const access = localStorage.getItem("access");
        const name = localStorage.getItem("username");

        if (!access) {
            router.push("/Login");
            return;
        }

        setUsername(name || "");

        async function fetchWorkspaces() {

            setLoading(true);

            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/showworkspaces/",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${access}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setWorkspaces(data.data || []);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchWorkspaces();

    }, [router]);

    function handleWorkspaceClick(id) {
        router.push(`/Workspace/${id}`);
    }

    return (
        <div>
            <div className={styles.title}>
            <h3>
                Welcome, {username}
            </h3>
            </div>

            <div>
                <div className={styles.subtitle}>

                <h1>

                    My Workspaces
                </h1>
                </div>

                {loading && <p>Loading workspaces...</p>}

                {!loading && workspaces.length === 0 && (
                    <p>No workspaces available.</p>
                )}

                
                <div className={styles.workspaceList}>
                {workspaces.map((workspace, index) => (
                
                <div
                key={workspace.id}
                onClick={() => handleWorkspaceClick(workspace.id)}
                className={`${styles.workspaceCard} ${styles[`color${index % 5}`]}`}
    >
                <h2 className={styles.workspaceName}>
                {workspace.title || workspace.name}
                </h2>
                </div>
                 
                 
                 ))}
                </div>
            </div>

        </div>
    );
}
  


