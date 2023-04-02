import './Visualization3.css';
import ReactECharts from 'echarts-for-react';
import React, { useState } from "react";
import data from './data.json';

function Visualization3() {
  
  const [popularity, setPopularity] = useState(100);

  data = data.sort((a, b) => {
    if(a.popularity < b.popularity) {
      return -1;
    }
  })

  let popularityData = [];
  let danceabilityData = [];
  let acousticnessData = [];
  let energyData = [];
  let instrumentalnessData = [];
  let livenessData = [];
  let speechinessData = [];
  let valenceData = [];

  for(var i = 0 ; i < (popularity * 50000 / 100); i++) {
    let index = 50000 - i - 1;
    popularityData.push(data[index]["popularity"]);
    danceabilityData.push(data[index]["danceability"]);
    acousticnessData.push(data[index]["acousticness"]);
    energyData.push(data[index]["energy"]);
    instrumentalnessData.push(data[index]["instrumentalness"]);
    livenessData.push(data[index]["liveness"]);
    speechinessData.push(data[index]["speechiness"]);
    valenceData.push(data[index]["valence"]);
  }

  function getAvg(data) {
    const total = data.reduce((acc, c) => acc + c, 0);
    return total / data.length;
  }

  const option = {
    title: {
      text: ""
    },
    legend: {

    },
    radar: {
      indicator: [
        { name: "Danceability", max: 1 },
        { name: "Acousticness", max: 1 },
        { name: "Energy", max: 1 },
        { name: "Instrumentalness", max: 1 },
        { name: "Liveness", max: 1 },
        { name: "Speechiness", max: 1 },
        { name: "Valence", max: 1 }
      ]
    },
    series: [
      {
        name: "",
        type: "radar",
        data: [
          {
            value: [getAvg(danceabilityData), getAvg(acousticnessData), getAvg(energyData), getAvg(instrumentalnessData), getAvg(livenessData), getAvg(speechinessData), getAvg(valenceData)]
          }
        ]
      }
    ]
  }; 

  function updateSlider(e) {
    setPopularity(e.target.value)
    let t = document.getElementById("tooltip");
    t.innerHTML = "Top " + e.target.value + "%";
  }

  return (
    <div className="App">
      <ReactECharts option={option} />
      <input type="range" id="visualization3slider" min="1" max="100" defaultValue="100" onChange={e => updateSlider(e)} />
      <output id="tooltip">Top 100%</output>
      <h3>Popularity</h3>
    </div>
  );
}

export default Visualization3;
