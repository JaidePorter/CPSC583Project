import './Visualization2.css';
import ReactECharts from 'echarts-for-react';
import React, { useState } from "react";
import data from './data.json';

function Visualization2() {
  
  const [popularity, setPopularity] = useState(100);
  const [dataDisplayed, setData] = useState([]);

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
  let currentLine = "all";

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

  for(var i in genreData) {
     for(var j = 0; j < 7; j++) {
      genreData[i].data[j] /= genreData[i].count;
     }
  }

  function getAvg(data) {
    const total = data.reduce((acc, c) => acc + c, 0);
    return total / data.length;
  }

  let allSongs = [getAvg(danceabilityData), getAvg(acousticnessData), getAvg(energyData), getAvg(instrumentalnessData), getAvg(livenessData), getAvg(speechinessData), getAvg(valenceData)];

  if(dataDisplayed.length == 0) {
    updateLine(currentLine);
  }
  const option = {
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
        width: 10,
        color: "#E27D60"
      }
    },
    series: [
      {
        name: "",
        type: "radar",
        data: [
          {
            value: dataDisplayed
          }
        ],
        lineStyle: {color: '#E27D60', width: 5,},
        itemStyle: {color: '#E27D60'}
      }
    ]
  };

  function updateLine(e) {
    if(e == "all") {
      setData(allSongs)
    }
    else {
      setData(genreData[e].data)
    }
    currentLine = e;
  }

  function updateSlider(e) {
    setPopularity(e.target.value)
    let t = document.getElementById("tooltip");
    t.innerHTML = "Top " + e.target.value + "%";
    updateLine(currentLine);
  }

  return (
    <div className="visualization-container">
      <h1>How do musical features positively or negatively impact a song's popularity?</h1>
      <label>Select Genre: </label>
      <select onChange={e => updateLine(e.target.value)}>
        <option value="all">All Songs</option>
        <option value="A Capella">Acapella</option>
        <option value="Alternative">Alternative</option>
        <option value="Anime">Anime</option>
        <option value="Blues">Blues</option>
        <option value="Children's Music">Children's Music</option>
        <option value="Classical">Classical</option>
        <option value="Comedy">Comedy</option>
        <option value="Country">Country</option>
        <option value="Dance">Dance</option>
        <option value="Electronic">Electronic</option>
        <option value="Folk">Folk</option>
        <option value="Hip-Hop">Hip-Hop</option>
        <option value="Indie">Indie</option>
        <option value="Jazz">Jazz</option>
        <option value="Movie">Movie</option>
        <option value="Opera">Opera</option>
        <option value="Pop">Pop</option>
        <option value="R&B">R&B</option>
        <option value="Rap">Rap</option>
        <option value="Reggae">Reggae</option>
        <option value="Reggaeton">Reggaeton</option>
        <option value="Rock">Rock</option>
        <option value="Ska">Ska</option>
        <option value="Soul">Soul</option>
        <option value="Soundtrack">Soundtrack</option>
        <option value="World">World</option>
      </select>
      <ReactECharts height="600px" className="vis2canvas" option={option} />
      <input type="range" id="visualization2slider" min="1" max="100" defaultValue="100" onChange={e => updateSlider(e)} />
      <output id="tooltip">Top 100%</output>
      <h3>Popularity</h3>
    </div>
  );
}

export default Visualization2;
