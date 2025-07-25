import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "60a3cdda6b5b422a9726e893c4fa937b";
const REDIRECT_URI = "http://localhost:3000/callback"; // Change if deployed
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SCOPES = ["user-read-private", "user-read-email", "user-top-read"].join(" ");

export default function SpotifyLogin() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  const loginWithSpotify = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
  };

  const exchangeCodeForToken = async (code) => {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: "YOUR_CLIENT_SECRET",
    });

    try {
      const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      const data = await response.json();
      localStorage.setItem("spotify_token", data.access_token);
      setToken(data.access_token);
      navigate("/spotify-dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  return (
    <div className="spotify-login-container">
      <h1>🎵 Connect to Spotify</h1>
      <p>Login to get personalized mood-boosting music</p>
      <button onClick={loginWithSpotify} className="spotify-button">
        Login with Spotify
      </button>
    </div>
  );
}
