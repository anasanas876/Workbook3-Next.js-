"use client";

import { useEffect, useState } from "react";

export default function Workspace() {

 

   
    const [workspaces, setWorkspaces] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState("");
    const [notes, setNotes] = useState([]);
    const [loadingWorkspaces, setLoadingWorkspaces] = useState(true);
    const [loadingNotes, setLoadingNotes] = useState(false)
    const [error, setError] = useState("");


    
    useEffect(() => {

        async function getWorkspaces() {

            try {

                setLoadingWorkspaces(true);
                setError(null);

                const response = await fetch(
                    "http://127.0.0.1:8000/workspace/"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch workspaces");
                }

                const data = await response.json();

                
                setWorkspaces(data);

            } catch (error) {

                console.error(error);
                setError("Could not load workspaces.");

            } finally {

                setLoadingWorkspaces(false);
            }
        }

        getWorkspaces();

    }, []);



    async function selectWorkspace(workspaceId) {

        try {

            // Remember which workspace the user opened
            setSelectedWorkspace(workspaceId);

            // Clear old notes while loading new ones
            setNotes([]);

            setLoadingNotes(true);
            setError(null);


            

            const response = await fetch(
                `http://127.0.0.1:8000/shownotes/?workspace=${workspaceId}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch notes");
            }

            const data = await response.json();

            
            setNotes[(data);]

        } catch (error) {

            console.error(error);
            setError("Could not load notes.");

        } finally {

            setLoadingNotes(false);
        }
    }


    // Writing function for Editing notes

    async function editNote(noteId) {

        try {

            // Get the selected notes from Django
            const response = await fetch(
                `http://127.0.0.1:8000/${noteId}/`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch note");
            }

            const note = await response.json();

            console.log("Note selected for editing:", note);

            
        } catch (error) {

            console.error("Error editing note:", error);
        }
    }


    

    return (
        <div>

            <h1>My Workspaces</h1>
             {loadingWorkspaces && (
                <p>Loading workspaces...</p>
            )}

            {!loadingWorkspaces && workspaces.length === 0 && (
                <p>No workspaces found.</p>
            )}

            <div>

                {workspaces.map(workspace => (

                    <button
                        key={workspace.id}
                        onClick={() => selectWorkspace(workspace.id)}
                    >

                        {workspace.name}

                    </button>

                ))}

            </div>


            {selectedWorkspace && (

                <div><h2>
                        Workspace {selectedWorkspace}
                    </h2>
                    {loadingNotes && (
                        <p>Loading notes...</p>
                    )}
                    // Using map function to get note id, title, content
                    {notes.map(note => (

                        <div key={note.id}>

                            <h3>
                                {note.title}
                            </h3>
                            <p>
                                {note.content}
                            </p>
                            // 
                            <button
                                onClick={() => editNote(note.id)}
                            >
                                Edit
                            </button>

                        </div>

                    ))}

                </div>
    
    // Function for version History
    function VersionHistory(){
        const notes={
            Content:note.content, title:note.title
        }
        const version=await fetch("http://127.0.0.1:8000/savehistory",{
            method:"POST",
            headers:{
                'content-type':'application/json'}
            }
            body:JSON.stringify(notes)
        }
        

    }
