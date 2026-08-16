async function userSignUp() {
    try {
        const username = document.getElementById("signupusername").value;
        const email = document.getElementById("signupemail").value;
        const password = document.getElementById("signuppassword").value;

        const user = {
            username,
            email,
            password
        }

        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Failed to Sign Up...")
        }

        console.log(data.message)



    } catch (error) {
        console.error("Sign Up Error:", error);
    }
}

async function userLogin() {
    try {
        const email = document.getElementById("loginemail").value;
        const password = document.getElementById("loginpassword").value;

        const user = {
            email,
            password
        }

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Failed to Login...")
        }

        console.log(data.message)
        sessionStorage.setItem("token", data.token);
        window.location.href = "dashboard.html"

    }catch (error) {
        console.error("Login Error:", error);
    }
}