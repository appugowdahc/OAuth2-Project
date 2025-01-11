import React from 'react';
import  GoogleLogin  from 'react-google-login';
import axios from 'axios';
import data from './secret_creds/Data';

const GoogleOAuth = () => {
  const handleSuccess = async (response) => {
    const { tokenId } = response;
    try {
      const res = await axios.post('http://localhost:8000/auth/google/', {
        id_token: tokenId,
      });
      console.log('Login Successful:', res.data);
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const handleFailure = (response) => {
    console.error('Login Failed:', response);
  };

  return (
    <div>
      <h1>Google OAuth2 Login</h1>
      <GoogleLogin
        clientId={data.client_id}
        buttonText="Login with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default GoogleOAuth;
