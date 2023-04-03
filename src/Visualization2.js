import './Visualization2.css';
import ReactECharts from 'echarts-for-react';
import React, { useState } from "react";
import data from './data.json';

function Visualization2() {
  
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
  let genreData = {};
  let genreList = [];

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
    let genre = data[index]["genre"];
    genreList.push(genre);
    let newEntry = [
      data[index]["danceability"],
      data[index]["acousticness"],
      data[index]["energy"],
      data[index]["instrumentalness"],
      data[index]["liveness"], 
      data[index]["speechiness"], 
      data[index]["valence"]];
    if(!genreData.hasOwnProperty(genre)) {
      genreData[genre] = {
        "count": 1,
        "data": newEntry
      }
    }
    else {
      genreData[genre].count += 1;
      for(var j = 0; j < 7; j++) {
        genreData[genre].data[j] += newEntry[j];
      }
    }
  }

  let radarData = [];
  for(var i in genreData) {
     for(var j = 0; j < 7; j++) {
      genreData[i].data[j] /= genreData[i].count;
     }
     radarData.push({
      "name": genreData[i],
      "value": genreData[i].data
     })
  }

  console.log(genreData)
  const genreColorMap = {
    "Children's Music": "#e41a1c",
    "Soundtrack": "#377eb8",
    "Comedy": "#4daf4a",
    "Folk": "#984ea3",
    "Electronic": "#ff7f00",
    "Indie": "#ffff29",
    "Hip-Hop": "#a65628",
    "Pop": "#f781bf",
    "Rock": "#999999",
    "Rap": "#dede00",
    "Jazz": "#d0d0d0",
    "Soul": "#696969",
    "Classical": "#ff7f50",
    "World": "#b0e0e6",
    "Alternative": "#8b4513",
    "R&B": "#00008b",
    "Blues": "#e6beff",
    "Anime": "#808000",
    "Reggae": "#ffd700",
    "Reggaeton": "#7f007f",
    "Ska": "#000000",
    "Dance": "#6b8e23",
    "Country": "#ffa07a",
    "Opera": "#ffb6c1",
    "Movie": "#2f4f4f",
    "A Capella": "#c71585"
  }; 

  function getAvg(data) {
    const total = data.reduce((acc, c) => acc + c, 0);
    return total / data.length;
  }

  const option = {
    legend: {
      // data: genreList
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
      ],
      radius: 250,
      startAngle: 90,
      splitNumber: 4,
      axisName: {
        formatter: '【{value}】',
        color: 'white'
      },
      splitArea: {
        areaStyle: {
          color: ["#45bead", "#41b1a1", "#3da798", "#399c8e"]
        }
      },
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'white'
        }
      }
    },
    emphasis: {
      lineStyle: {
        width: 10
      }
    },
    series: [
      {
        name: "",
        type: "radar",
        // data: [
        //   {
        //     value: [getAvg(danceabilityData), getAvg(acousticnessData), getAvg(energyData), getAvg(instrumentalnessData), getAvg(livenessData), getAvg(speechinessData), getAvg(valenceData)]
        //   }
        // ]
        data: radarData
      }
    ]
  }; 

  function updateSlider(e) {
    setPopularity(e.target.value)
    let t = document.getElementById("tooltip");
    t.innerHTML = "Top " + e.target.value + "%";
  }

  return (
    <div className="visualization-container">
      <h1>How do musical characteristics impact a song's popularity?"</h1>
      <ReactECharts height="600px" className="vis2canvas" option={option} />
      <input type="range" id="visualization2slider" min="1" max="100" defaultValue="100" onChange={e => updateSlider(e)} />
      <output id="tooltip">Top 100%</output>
      <h3>Popularity</h3>
    </div>
  );
}

export default Visualization2;
