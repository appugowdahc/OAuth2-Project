import axios from "axios";

const fetchProtectedResource = () => {
    const token = localStorage.getItem("access_token");
    axios
        .get("http://127.0.0.1:8000/authentication/protected/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => console.log(response.data))
        .catch((error) => console.error("Error accessing resource:", error));
};

const ProtectedResource = () => {
    return (
        <div>
            <button onClick={fetchProtectedResource}>Access Protected Resource</button>
        </div>
    );
};

export default ProtectedResource;
