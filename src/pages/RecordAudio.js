import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./RecordAudio.css";

export default function RecordAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Delete Recording
  const deleteRecording = () => {
    setAudioURL(null);
  };

  return (
    <div className="record-audio-container">
      <h1 className="record-title">🎙 Record Your Thoughts</h1>
      <p className="record-subtitle">Express yourself freely and let MindJournal analyze your emotions through voice patterns.</p>

      <div className="record-buttons">
        {isRecording ? (
          <button className="stop-recording" onClick={stopRecording}>⏹ Stop Recording</button>
        ) : (
          <button className="start-recording" onClick={startRecording}>🎤 Start Recording</button>
        )}
      </div>

      {audioURL && (
        <div className="audio-playback">
          <h3>Playback</h3>
          <audio controls>
            <source src={audioURL} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <button className="delete-recording" onClick={deleteRecording}>❌ Delete Recording</button>
        </div>
      )}

      <button className="back-button" onClick={() => navigate("/")}>🏠 Back to Home</button>
    </div>
  );
}
