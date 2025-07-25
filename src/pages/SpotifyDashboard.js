import React, { useEffect, useState } from "react";
import "./SpotifyDashboard.css";

// Hardcoded songs based on mood
const moodBasedSongs = {
  joy: [
    { name: "Happy", artist: "Pharrell Williams", link: "https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH" },
    { name: "Can't Stop The Feeling!", artist: "Justin Timberlake", link: "https://open.spotify.com/track/6JV2JOEocMgcZxYSZelKcc" },
  ],
  excitement: [
    { name: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", link: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS" },
    { name: "We Will Rock You", artist: "Queen", link: "https://open.spotify.com/track/4u7EnebtmKWzUH433cf5Qv" },
  ],
  love: [
    { name: "Perfect", artist: "Ed Sheeran", link: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v" },
    { name: "Thinking Out Loud", artist: "Ed Sheeran", link: "https://open.spotify.com/track/34gCuhDGsG4bRPIf9bb02f" },
  ],
  sadness: [
    { name: "Someone Like You", artist: "Adele", link: "https://open.spotify.com/track/4iJyoBOLtHqaGxP12qzhQI" },
    { name: "Fix You", artist: "Coldplay", link: "https://open.spotify.com/track/7LVHVU3tWfcxj5aiPFEW4Q" },
  ],
  anger: [
    { name: "Break Stuff", artist: "Limp Bizkit", link: "https://open.spotify.com/track/0mXTJETA4XUa12MmmXzZlh" },
    { name: "Killing In The Name", artist: "Rage Against The Machine", link: "https://open.spotify.com/track/2mXhC3UehK06BfZ3SY3xNj" },
  ],
  relaxation: [
    { name: "Weightless", artist: "Marconi Union", link: "https://open.spotify.com/track/2UftlgOizdPlAyE2TQJtOx" },
    { name: "Clair de Lune", artist: "Debussy", link: "https://open.spotify.com/track/2NnyGJQgude1B2mpKgCtSF" },
  ],
  nervousness: [
    { name: "Breathe", artist: "Télépopmusik", link: "https://open.spotify.com/track/6uSKeCyQEoNJ7swxR5a9br" },
    { name: "Weightless", artist: "Marconi Union", link: "https://open.spotify.com/track/2UftlgOizdPlAyE2TQJtOx" },
  ],
  fear: [
    { name: "Boulevard of Broken Dreams", artist: "Green Day", link: "https://open.spotify.com/track/5N9Cd2XBQK5js5lZZmD12r" },
    { name: "Bring Me To Life", artist: "Evanescence", link: "https://open.spotify.com/track/4Cd6tcVPOEGdEPotE5Torg" },
  ],
  default: [
    { name: "Don't Stop Believin'", artist: "Journey", link: "https://open.spotify.com/track/77NNZQSqzLNqh2A9JhLRkg" },
    { name: "Bohemian Rhapsody", artist: "Queen", link: "https://open.spotify.com/track/1AhDOtG9vPSOmsWgNW0BEY" },
  ],
};

export default function SpotifyDashboard({ topEmotion }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (topEmotion && moodBasedSongs[topEmotion]) {
      setSongs(moodBasedSongs[topEmotion]);
    } else {
      setSongs(moodBasedSongs.default);
    }
  }, [topEmotion]);

  return (
    <div className="spotify-dashboard">
      <h2>🎶 Recommended Songs for Your Mood</h2>

      {songs.length > 0 ? (
        <ul className="song-list">
          {songs.map((song, index) => (
            <li key={index} className="song-item">
              <div className="song-details">
                <h3>{song.name}</h3>
                <p>{song.artist}</p>
                <a href={song.link} target="_blank" rel="noopener noreferrer">
                  🎵 Play on Spotify
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
}
