import './DataDescription.css';
import React from "react";

function DataDescription() {
  return (
    <div className="data-description-container">
      <h2>The Dataset</h2>
      <p>
      The visualizations below are based on a subset of 50,000 entries from the 
      "Spotify Tracks DB" dataset by Zaheem Hamidani 
      (available on kaggle.com/datasets/zaheenhamidani/ultimate-spotify-tracks-db).
      <br/>
      <br/>
      Spotify uses a popularity ranking system that ranges from 0 to 100 to rank the 
      popularity of artists and their tracks. The higher a track's rank, the more discoverable 
      it is within the app. As a result, artists with more popular tracks are likely to 
      receive greater exposure and have a higher potential of reaching new fans.
      </p>
    </div>
  );
}

export default DataDescription;
