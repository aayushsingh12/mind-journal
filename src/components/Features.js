// src/components/Features.js
import React from "react";

export default function Features() {
  return (
    <div className="mt-10 text-center p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">What MindJournal Offers</h2>
      <ul className="mt-4 text-gray-600 space-y-3 text-lg">
        <li>📖 AI-driven text and voice journaling</li>
        <li>📊 Mood tracking & analytics with insightful graphs</li>
        <li>🎵 Personalized Spotify Mood Booster</li>
        <li>🧘‍♂️ Guided mindfulness and coping exercises</li>
      </ul>
    </div>
  );
}
