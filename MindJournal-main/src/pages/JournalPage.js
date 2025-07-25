import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpotifyDashboard from "./SpotifyDashboard"; // Import Spotify recommendations
import "./JournalPage.css";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [depressionScore, setDepressionScore] = useState(null);
  const [topEmotions, setTopEmotions] = useState([]);
  const [topEmotion, setTopEmotion] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // Default white
  const navigate = useNavigate();

  // List of conversation starters
  const prompts = [
    "What’s something that made you smile today?",
    "If you could travel anywhere, where would you go?",
    "Describe your perfect day.",
    "What’s a personal goal you’re currently working on?",
    "What’s a song that perfectly describes your mood right now?",
    "What’s the best piece of advice you’ve ever received?",
    "What motivates you to keep going during tough times?",
  ];

  useEffect(() => {
    setPlaceholder(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  // Function to change background color based on depression score
  const updateBackgroundColor = (score) => {
    if (score < 30) setBackgroundColor("#27ae60"); // Green (Good Mood)
    else if (score < 60) setBackgroundColor("#f1c40f"); // Yellow (Neutral)
    else setBackgroundColor("#e74c3c"); // Red (High Depression Score)
  };

  // Function to fetch depression score & emotions
  const analyzeMood = async () => {
    if (!entry.trim()) {
      console.warn("Entry is empty, cannot analyze mood.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ journal_entry: entry }),
      });

      const data = await response.json();
      console.log("Analyze Mood API response:", data);
      setDepressionScore(data.depression_score);
      setTopEmotions(data.top_5_emotions.slice(0, 3));
      setTopEmotion(data.top_5_emotions.length > 0 ? data.top_5_emotions[0][0] : null);

      // Update background based on depression score
      updateBackgroundColor(data.depression_score);
    } catch (error) {
      console.error("Error analyzing mood:", error);
    }
  };

  // Function to save entry with timestamp
  const saveEntry = () => {
    if (entry.trim() !== "" && depressionScore !== null) {
      const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
      const newEntry = {
        text: entry,
        score: depressionScore,
        top_emotions: topEmotions,
        timestamp: new Date().toISOString(),
      };
      savedEntries.push(newEntry);
      try {
        localStorage.setItem("journalEntries", JSON.stringify(savedEntries));
        console.log("Saved entry:", newEntry);
        console.log("All saved entries:", savedEntries);
      } catch (err) {
        console.error("Error saving entry to localStorage:", err);
      }
      setEntry("");
      setDepressionScore(null);
      setBackgroundColor("#ffffff"); // Reset background to white
      navigate("/saved-entries");
    } else {
      console.warn("Cannot save entry: either entry is empty or depressionScore is null.");
    }
  };

  return (
    <div className="journal-container" style={{ backgroundColor }}>
      <div className="journal-box">
        <h1 className="journal-title">📖 Start Journaling</h1>
        <p className="journal-subtitle">Write down your thoughts and let ML analyze your mood.</p>

        <textarea
          className="journal-input"
          placeholder={placeholder}
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />

        <button className="analyze-button" onClick={analyzeMood}>
          Analyze Mood
        </button>

        {depressionScore !== null && (
          <div className="analysis-results">
            <p className="depression-score">🧠 Depression Score: {depressionScore}</p>
            <p className="top-emotions">
              Top Emotions: {topEmotions.map(e => `${e[0]} (${(e[1] * 100).toFixed(2)}%)`).join(", ")}
            </p>
          </div>
        )}

        {/* Show Spotify recommendations when a mood is detected */}
        {topEmotion && <SpotifyDashboard topEmotion={topEmotion} />}

        <button className="save-button" onClick={saveEntry} disabled={!depressionScore}>
          Save Entry
        </button>
      </div>
    </div>
  );
}
