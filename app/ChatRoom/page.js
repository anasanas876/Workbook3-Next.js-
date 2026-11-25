
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRoom() {

    const router = useRouter();

    const [groupName, setGroupName] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    async function CreateChatRoom(event) {

        event.preventDefault();

        if (!groupName.trim()) {
            setMessage("Please enter a room name.");
            setStatus("error");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("access");

            const response = await fetch(
                "http://127.0.0.1:8000/createroom/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        GroupName: groupName
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                setStatus("success");
                setMessage("Room created successfully!");

                setTimeout(() => {
                    router.push(`/rooms/${data.room_id}`);
                }, 1500);

            } else {

                setStatus("error");
                setMessage(data.detail || data.error || "Room creation failed.");
            }

        } catch (error) {

            setStatus("error");
            setMessage("Unable to connect to the server.");

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Create a Chat Room
                </h1>

                <p className="text-gray-500 mb-6 color-aquablue">
                    Enter a name for your new group.
                </p>

                <form onSubmit={CreateChatRoom}>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Room Name
                    </label>

                    <input
                        type="text"
                        name="GroupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter room name..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Creating..." : "Create Room"}
                    </button>

                </form>

                {message && (
                    <div className={`mt-5 p-3 rounded-lg text-sm ${
                        status === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}>
                        {message}
                    </div>
                )}

            </div>

        </div>
    );
}
