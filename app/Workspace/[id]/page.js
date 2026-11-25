
"use client";

import CreateRoom from '@/components/chat_room';
import FetchData from '@/components/fetchprojects.js';
import styles from "./[id].module.css";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";






export default function WorkspacePage() {

    const { id } = useParams();
    const router = useRouter();

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const[companyid,setcompanyid]=useState("");
    const[role,setrole]=useState("");


    // Fetch existing rooms
    const fetchRooms = useCallback(async () => {

        setLoading(true);
        setError("");

        try {
            const access = localStorage.getItem("access");

            const response = await fetch(
                `https://workbook2-module2-3.onrender.com/showrooms/?workspace=${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${access}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error("Failed to fetch rooms");
            }

            setRooms(data.data || []);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }, [id]);
   
   
   
    
    
    







    useEffect(() => {
        const access = localStorage.getItem("access");
        const company_id=localStorage.getItem("company_id");
        const role=localStorage.getItem("role")

        setrole(role)
       
        setcompanyid(company_id)

        
        setToken(access || "");

        if (id) {
            fetchRooms();
        }
    }, [id, fetchRooms]);

    
    
    return (
  <div className={styles.page}>
    {/* ---------- Header ---------- */}
    <header className={styles.header}>
      <h1 className={styles.pageTitle}>Workspace Rooms</h1>

      <div className={styles.createBox}>
        <CreateRoom id={id} token={token} onRoomCreated={fetchRooms} />
      </div>
    </header>

    <div className={styles.layout}>
      {/* ---------- Rooms (main column) ---------- */}
      <section className={styles.rooms}>
        {loading && <p className={styles.status}>Loading rooms...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && rooms.length === 0 && (
          <p className={styles.empty}>
            No chat rooms available. Create your first room.
          </p>
        )}

        <div className={styles.roomGrid}>
          {rooms.map((room) => (
            <div
              key={room.id}
              className={styles.roomCard}
              onClick={() => router.push(`/Workspace/${id}/${room.id}`)}
            >
              <h2 className={styles.roomName}>{room.room_name}</h2>
              <p className={styles.roomHint}>Click to enter room</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Projects (side column) ---------- */}
      {(role === "manager" || role === "employee") && (
        <aside className={styles.sidebar}>
          <h2 className={styles.sectionTitle}>Projects List</h2>
          <FetchData token={token} id={companyid} />
        </aside>
      )}
    </div>
  </div>
);}
