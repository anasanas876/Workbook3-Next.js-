"use client"

import { useState } from 'react';
import Link from 'next/link'
// Task 3
function DashBoard(){
    return <div>
        <Link href="/login">Go to Login Page</Link> 
    </div>
}
export default DashBoard;

// task 4
function ParentComponent(){
    return <div>
        <ChildComponent/>
    </div>
}
export default ParentComponent

function ChildComponent(){
    return <ol>
        <li>I have practised Front-End Concepts</li>
        <li>I am learning Next.js</li>
    </ol>
}
export default ChildComponent

// Task 5
function counter(){
    const [sidebar,setsidebar]=useState(0);
    return (

        <div>
            <button onClick={() => setShowSidebar(!showSidebar)}>
                Toggle Sidebar
            </button>
            {showSidebar && <Sidebar />}
             </div>
             );
}
export default counter;
    
    
