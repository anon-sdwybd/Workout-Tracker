function Logout() {
    sessionStorage.removeItem("token");
    window.location.href = "../html/auth.html";
}

async function DisplaySettings() {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await response.json();

    document.getElementById("username-output").textContent = data.username;
    document.getElementById("email-output").textContent = data.email;
    document.getElementById("displayname-output").textContent = data.displayname;
}

DisplaySettings();