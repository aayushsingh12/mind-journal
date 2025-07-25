import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./SavedEntries.css";

export default function SavedEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="saved-entries-container">
      <h1 className="saved-title">📜 Your Saved Journal Entries</h1>
      <p className="saved-subtitle">Track your mental well-being over time.</p>

      {entries.length > 0 && (
        <div className="graph-container">
          <h2 className="graph-title">📈 Depression Score Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={entries.map(e => ({ time: formatDate(e.timestamp), score: e.score }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#ff7300" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="entries-grid">
        {entries.map((entry, index) => (
          <div key={index} className="entry-card">
            <p className="entry-text">📝 {entry.text}</p>
            <p className="entry-score">🧠 Depression Score: <span>{entry.score}</span></p>
            <p className="entry-emotions">
              😃 Top Emotions: {entry.top_emotions?.length > 0 
                ? entry.top_emotions.map(e => `${e[0]} (${(e[1] * 100).toFixed(2)}%)`).join(", ")
                : "No emotions detected"}
            </p>
            <p className="entry-date">📅 {formatDate(entry.timestamp)}</p>
            <button className="delete-btn" onClick={() => deleteEntry(index)}>❌ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
