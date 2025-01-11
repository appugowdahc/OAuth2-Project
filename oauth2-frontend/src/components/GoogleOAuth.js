import React, { useState } from "react";
import data from "../Data";
import { FcGoogle } from "react-icons/fc";

const styles = {
    button: {
        width: "16%",
        padding: "10px",
        color: "black",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        marginLeft:'3px',
    },
};
const GoogleOAuth = () => {
    // Handle Google OAuth2
    const handleGoogleLogin = async () => {
        try {
            // Open Google OAuth2 login popup
            const authEndpoint = `https://accounts.google.com/o/oauth2/v2/auth`;
            const clientId = data.client_id
            const redirectUri = "http://localhost:3001";
            const scope = "profile email";

            const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
            window.location.href = authUrl;
        } catch (error) {
            console.error("Google Login Failed", error);
            alert("Google login failed. Please try again.");
        }
    };
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <button
                onClick={handleGoogleLogin}
                style={{
                    ...styles.button,
                    marginTop: "20px",
                    //   backgroundColor: "#4285F4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <FcGoogle style={{ marginRight: "10px", fontSize: "20px" }} />
                Login with Google
            </button>

        </div>
    )
}


export default GoogleOAuth;