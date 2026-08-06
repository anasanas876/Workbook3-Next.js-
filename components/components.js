const handleLogout=()=>{
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")

window.location.href = "/login";
};

export default handleLogout;