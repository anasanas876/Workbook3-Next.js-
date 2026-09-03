
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("access")) {
            router.push("/Login");
        }
    }, [router]);

    const username = localStorage.getItem("username");

    return (
        <div>
            <div style={{ paddingTop: "30px", paddingLeft: "30px" }}>
                <h3>Welcome, {username}</h3>
            </div>
        </div>
    );
}

