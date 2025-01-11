import React, { useState } from "react";
import GoogleOAuth from "../components/GoogleOAuth";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle regular login
    const handleLogin = async (e) => {
        e.preventDefault();

        // Backend API endpoint to authenticate user
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Welcome back, ${data.user.name}`);
        } else {
            alert(data.message || "Login failed");
        }
    };


    // Handle Google OAuth2 Redirect
    const handleGoogleCallback = async () => {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");

        if (accessToken) {
            const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
            const user = await response.json();
            alert(`Welcome, ${user.name}!`);
            console.log("Google User Info:", user);
        }
    };

    // Check if redirected after Google login
    React.useEffect(() => {
        if (window.location.hash.includes("access_token")) {
            handleGoogleCallback();
        }
    }, []);

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </div>

            </form>
            <div>
                <div style={styles.divisionDiv}>OR</div>
                <div>
                    {<GoogleOAuth />}
                </div>
            </div>

        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        marginTop: "50px",
    },
    form: {
        display: "inline-block",
        textAlign: "left",
        maxWidth: "300px",
    },
    inputGroup: {
        marginBottom: "15px",
    },
    input: {
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    button: {
        width: "300px",
        padding: "10px",
        backgroundColor: "#4285F4",
        color: "#fff",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",

    },
    divisionDiv:{
        marginTop:"15px"
    }
};

export default Login;
