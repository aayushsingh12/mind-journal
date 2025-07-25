// src/components/Button.js
import React from "react";

export default function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-lg font-semibold rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );
}
