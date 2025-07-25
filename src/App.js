import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Lazy load pages for performance optimization
const HomePage = lazy(() => import("./pages/HomePage"));
const JournalPage = lazy(() => import("./pages/JournalPage"));
const RecordAudio = lazy(() => import("./pages/RecordAudio"));
const SavedEntries = lazy(() => import("./pages/SavedEntries"));

function App() {
  return (
    <div className="App">
      <Header />
      <main className="content">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/record-audio" element={<RecordAudio />} />
            <Route path="/saved-entries" element={<SavedEntries />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
