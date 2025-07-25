import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <div className="hero-section">
                <h1 className="main-title">MindJournal</h1>
                <p className="hero-subtitle">
                    AI-powered journaling to help detect early signs of depression and promote mental well-being.
                </p>
                <p className="slogan">MindJournal – Because Every Thought Deserves to be Heard.</p>

                <div className="button-group">
                    <button className="primary-button" onClick={() => navigate("/journal")}>Start Journaling</button>
                    <button className="secondary-button" onClick={() => navigate("/record-audio")}>Record Audio</button>
                </div>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <h2>📖 AI-Powered Journaling</h2>
                    <p>Analyze your text for mood detection and insights.</p>
                </div>
                <div className="feature-card">
                    <h2>📊 Mood Tracking</h2>
                    <p>Monitor emotional patterns with insightful analytics.</p>
                </div>
                <div className="feature-card">
                    <h2>🎵 Spotify Mood Booster</h2>
                    <p>Get personalized playlists based on your mood.</p>
                </div>
                <div className="feature-card">
                    <h2>🧘‍♂️ Guided Therapy</h2>
                    <p>CBT-based mindfulness exercises for mental well-being.</p>
                </div>
            </div>
        </div>
    );
}
