import './Visualization2.css';
import ReactECharts from 'echarts-for-react';
import React, { useState } from "react";
import data from './data.json';

function Visualization2() {
  
  const [popularity, setPopularity] = useState(100);
  const [genreSelected, setGenre] = useState("all");

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
  let currentLine = "all";
  let genreCounts = {
    "all": 50000,
    "A Capella": 21,
    "Alternative": 1958,
    "Anime": 1926,
    "Blues": 1935,
    "Children's Music": 3189,
    "Classical": 1972,
    "Comedy": 2109,
    "Country": 1823,
    "Dance": 1843,
    "Electronic": 2054,
    "Folk": 2067,
    "Hip-Hop": 2022,
    "Indie": 2046,
    "Jazz": 1985,
    "Movie": 1643,
    "Opera": 1744,
    "Pop": 2015,
    "R&B": 1952,
    "Rap": 1995,
    "Reggae": 1882,
    "Reggaeton": 1879,
    "Rock": 2000,
    "Ska": 1861,
    "Soul": 1982,
    "Soundtrack": 2126, 
    "World": 1971
  }
  let songCount = genreCounts[genreSelected];
  var a = 0;
  var b = 0;

  while(b < (popularity * songCount / 100)) {
    let index = 50000 - a - 1;
    if(genreSelected == "all") {
      popularityData.push(data[index]["popularity"]);
      danceabilityData.push(data[index]["danceability"]);
      acousticnessData.push(data[index]["acousticness"]);
      energyData.push(data[index]["energy"]);
      instrumentalnessData.push(data[index]["instrumentalness"]);
      livenessData.push(data[index]["liveness"]);
      speechinessData.push(data[index]["speechiness"]);
      valenceData.push(data[index]["valence"]);
      b++;
    }
    else {
      let genre = data[index]["genre"];
      if(genre == genreSelected) {
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
        b++;
      }
    }
    a++;
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

  let dataDisplayed = [];
  if(genreSelected == "all") {
    let allSongs = [getAvg(danceabilityData), getAvg(acousticnessData), getAvg(energyData), getAvg(instrumentalnessData), getAvg(livenessData), getAvg(speechinessData), getAvg(valenceData)];
    dataDisplayed = allSongs;
  }
  else {
    dataDisplayed = genreData[genreSelected].data;
  }

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
    setGenre(e);
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
      <div className="grid-container">
        <div>
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
        <div className="text-container">
          <p>
            The radar plot presented here displays the positive and negative impacts of various musical attributes on the popularity of a song. 
            The slider enables the user to adjust the number of songs included in the visualization. For example, selecting the top 30% would 
            display the attributes of the 30% most popular songs in the dataset, while selecting the top 100% would show all songs.
            <br/>
            <br/>
            The selection field can be used to filter the data by genre, allowing the user to view the attributes of songs in a specific genre. 
            By default, the plot shows the attributes of all songs.
            <br/>
            <br/>
            Comparing the default configuration (showing the top 100% of all songs) with the top 30%, we can observe that danceability 
            and energy have a greater impact on a song's popularity, while acousticness and instrumentalness have a negative impact. 
            However, these values may vary when the plot is filtered by genre.
            <br/>
            <br/>
            Artists can use this visualization to identify the most influential musical attributes for their genre in terms of popularity. 
            They can focus on incorporating the features that positively impact their songs' popularity while avoiding those that detract 
            from it, as indicated by the dataset.</p>
        </div>
      </div>
    </div>
  );
}

export default Visualization2;
