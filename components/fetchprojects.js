// Fetching projects from django API

async function fetch_data(params) {

    // Using access token
    const token = localStorage.getItem("access");

    const response = await fetch("http://127.0.0.1:8000/showprojects/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const projects = await response.json();

    if (response.status == 403) {

        const token = localStorage.getItem("refresh");

        const refreshResponse = await fetch("http://127.0.0.1:8000/refreshtoken", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await refreshResponse.json();

        localStorage.setItem("access", data.access);

        const newToken = localStorage.getItem("access");

        const response = await fetch("http://127.0.0.1:8000/showprojects/", {
            headers: {
                Authorization: `Bearer ${newToken}`,
            },
        });

        const projects = await response.json();

        console.log(projects);

    } else {

        console.log(projects);

    }

}

// Show Logged-in User name
return <>
<div>
    
</div>
</>