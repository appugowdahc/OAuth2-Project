import {useState } from "react";


// Utility to generate the code verifier and code challenge
const generateCodeVerifier = () => {
    const randomString = Math.random().toString(36).substring(2); // Simple random string
    return randomString;
};

const generateCodeChallenge = (codeVerifier) => {
    return new Promise((resolve, reject) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        window.crypto.subtle.digest("SHA-256", data)
            .then((hash) => {
                const base64Url = btoa(String.fromCharCode(...new Uint8Array(hash)))
                    .replace(/\+/g, "-")
                    .replace(/\//g, "_")
                    .replace(/=+$/, "");
                resolve(base64Url);
            })
            .catch(reject);
    });
};

const CLIENT_ID = "719087869569-a56q0odm5k1pejh46an0gniehm39hdqn.apps.googleusercontent.com"; // From Django Admin
const REDIRECT_URI = "http://localhost:3001/callback";
const AUTH_URL = "http://127.0.0.1:8000/o/authorize/";

const LoginButton = () => {
    const [codeChallenge, setCodeChallenge] = useState(null);
    const [codeVerifier, setCodeVerifier] = useState(null);

    const handleLogin = async () => {
        const verifier = generateCodeVerifier();
        setCodeVerifier(verifier);

        const challenge = await generateCodeChallenge(verifier);
        setCodeChallenge(challenge);

        // Store the codeVerifier in sessionStorage for later use (in token exchange)
        sessionStorage.setItem("code_verifier", verifier);

        const authUrl = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&code_challenge=${challenge}&code_challenge_method=S256`;

        window.location.href = authUrl;
    };

    return <button onClick={handleLogin}>Login with OAuth2</button>;
};

export default LoginButton;
