import React, { useEffect, useState } from "react";
import spotify from "../utils/spotify";
import "./SpotifyPlaylist.css";

export default function SpotifyPlaylist() {
  const [playlists, setPlaylists] = useState([]);

  // Fetch mood-based playlists from Spotify
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await spotify.searchPlaylists("relaxing", { limit: 10 });
        setPlaylists(response.playlists.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="playlist-container">
      <h1>🎶 Mood-Boosting Playlists</h1>
      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <img src={playlist.images[0]?.url} alt={playlist.name} />
            <h3>{playlist.name}</h3>
            <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              Open in Spotify
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
