import {React ,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginButton from './LoginButton';
import ProtectedResource from './ProtectedResource';
import axios from 'axios';

const Callback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
        const codeVerifier = sessionStorage.getItem("code_verifier");  // Retrieve the code_verifier from session storage

        axios
            .post("http://127.0.0.1:8000/o/token/", {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: "http://localhost:3001/callback",
                client_id: "719087869569-a56q0odm5k1pejh46an0gniehm39hdqn.apps.googleusercontent.com",
                client_secret: "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e",  // Use only in confidential apps
                code_verifier: codeVerifier  // Send the code_verifier
            })
            .then((response) => {
                localStorage.setItem("access_token", response.data.access_token);
            })
            .catch((error) => console.error("Error fetching token:", error));
    }
}, []);

return <div>OAuth2 Authentication</div>;

};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Define your routes here */}
                <Route path="/" element={<LoginButton />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/protected" element={<ProtectedResource />} />
            </Routes>
        </Router>
    );
};

export default App;
