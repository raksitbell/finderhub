import React from "react";

export default function FinderHubLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-2xl font-bold tracking-tight text-white font-logo">
        FINDERHUB
      </span>
    </div>
  );
}
