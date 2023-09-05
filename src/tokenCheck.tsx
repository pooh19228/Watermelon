import React, { useState } from "react";
import axios from "axios";

const TokenCheck: React.FC = () => {
  const [clientId, setClientId] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

  const handleTokenCheck = async () => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        null,
        {
          params: {
            grant_type: "client_credentials",
          },
          headers: {
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          },
        }
      );

      if (response.status === 200) {
        const { access_token } = response.data;
        setAccessToken(access_token);
        alert("Success!");
        console.log("Access Token:", access_token);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Spotify Access Token Check</h1>
      <div>
        <label>
          Client ID:
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Client Secret:
          <input
            type="text"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleTokenCheck}>Check Token</button>
      </div>
      {accessToken && (
        <div>
          <h2>Access Token:</h2>
          <p>{accessToken}</p>
        </div>
      )}
    </div>
  );
};

export default TokenCheck;
