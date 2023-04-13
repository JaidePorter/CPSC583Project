import React, {useEffect, useState} from "react";
import 'echarts-liquidfill';
import ReactECharts from 'echarts-for-react';
import './Visualization3.css';
import data from './data.json';

function closest(needle, haystack) {
  return haystack.reduce((a, b) => {
      let aDiff = Math.abs(a - needle);
      let bDiff = Math.abs(b - needle);

      if (aDiff == bDiff) {
          return a > b ? a : b;
      } else {
          return bDiff < aDiff ? b : a;
      }
  });
}

function Visualization3() {

  data = data.sort((a, b) => {
    if(a.popularity < b.popularity) {
      return -1;
    }
  })

  data = data.map((dataPoint) => {
    dataPoint.danceability = Math.round(4*dataPoint.danceability)/4;
    dataPoint.energy = Math.round(4*dataPoint.energy)/4;
    dataPoint.valence = Math.round(4*dataPoint.valence)/4;
    dataPoint.liveness = Math.round(4*dataPoint.liveness)/4;
    dataPoint.speechiness = Math.round(4*dataPoint.speechiness)/4;
    return dataPoint;
  });

  let [chosenGenre, setChosenGenre] = useState("Children's Music");
  let [chosenDanceability, setChosenDanceability] = useState(0);
  let [chosenEnergy, setChosenEnergy] = useState(0);
  let [chosenValence, setChosenValence] = useState(0);
  let [chosenLiveness, setChosenLiveness] = useState(0);
  let [chosenSpeechiness, setChosenSpeechiness] = useState(0);
  let [resultingPopularity, setResultingPopularity] = useState(0.5);
  
  let [chosenColor, setChosenColor] = useState(["#004D40", "#2E9987", "#00E5BF"]);
  let [shape, setShape] = useState("");

  useEffect(() => {
    let genreFiltered = data.filter((dataPoint) => dataPoint.genre === chosenGenre);

    let targetDanceability = closest(chosenDanceability, genreFiltered.map(dataPoint => dataPoint.danceability));
    let danceabilityFiltered = genreFiltered.filter((dataPoint) => dataPoint.danceability === targetDanceability);

    let targetEnergy = closest(chosenEnergy, danceabilityFiltered.map(dataPoint => dataPoint.energy));
    let energyFiltered = danceabilityFiltered.filter((dataPoint) => dataPoint.energy === targetEnergy);

    let targetValence = closest(chosenValence, energyFiltered.map(dataPoint => dataPoint.valence));
    let valenceFiltered = energyFiltered.filter((dataPoint) => dataPoint.valence === targetValence);

    let targetLiveness = closest(chosenLiveness, valenceFiltered.map(dataPoint => dataPoint.liveness));
    let livenessFiltered = valenceFiltered.filter((dataPoint) => dataPoint.liveness === targetLiveness);

    let targetSpeechiness = closest(chosenSpeechiness, livenessFiltered.map(dataPoint => dataPoint.speechiness));
    let speechinessFiltered = livenessFiltered.filter((dataPoint) => dataPoint.speechiness === targetSpeechiness);

    let total = 0;
    speechinessFiltered.forEach((dataPoint) => total += dataPoint.popularity);
    total /= speechinessFiltered.length;
    setResultingPopularity(parseFloat(total.toFixed(2)));
  }, [chosenGenre, chosenDanceability, chosenEnergy, chosenValence, chosenLiveness, chosenSpeechiness]);

  useEffect(() => {
    if(resultingPopularity < 0.25) {
      setChosenColor(["#4D4D4D", "#635A5E", "#595059"]);
      setShape('path://M 8 1 a 7 7 0 1 0 0 14 A 7 7 0 0 0 8 1 Z M 6 5 c 0.559 0 1.031 0.473 1.031 1.031 V 7 c 0 0.558 -0.472 1 -1.03 1 c -0.56 0 -1 -0.442 -1 -1 v -0.969 C 5 5.473 5.44 5 6 5 Z m 4 0 c 0.559 0 1 0.473 1 1.031 V 7 c 0 0.558 -0.441 1 -1 1 c -0.558 0 -1 -0.442 -1 -1 v -0.969 C 9 5.473 9.442 5 10 5 Z m 3 5.943 c -0.996 -0.637 -4.016 -0.917 -5 -0.917 c -0.983 0 -3.804 -0.051 -5 0.917 v -0.5 c 0 -0.681 1.744 -1.404 5 -1.404 c 3.256 0 5 0.871 5 1.404 Z');
    } else if (resultingPopularity < 0.50) {
      setChosenColor(["#1E88E5", "#2C4B66", "#176AB3"]);
      setShape('path://M 8 1 a 7 7 0 1 0 0 14 A 7 7 0 0 0 8 1 Z M 6 5 c 0.558 0 1.031 0.473 1.031 1.031 V 7 c 0 0.558 -0.473 1 -1.031 1 c -0.558 0 -1 -0.442 -1 -1 v -0.969 C 5 5.473 5.442 5 6 5 Z m 4 0 c 0.558 0 1 0.473 1 1.031 V 7 c 0 0.558 -0.442 1 -1 1 s -1 -0.442 -1 -1 v -0.969 C 9 5.473 9.442 5 10 5 Z m -6.5 5 h 9 a 0.499 0.499 0 1 1 0 1 h -9 a 0.499 0.499 0 1 1 0 -1 Z');
    } else if (resultingPopularity < 0.75) {
      setChosenColor(["#D9CA30", "#F0CB29", "#E6AF27"]);
      setShape("path://M 8 1 a 7 7 0 1 0 0 14 A 7 7 0 0 0 8 1 Z M 6 5 c 0.559 0 1.031 0.473 1.031 1.031 V 7 c 0 0.558 -0.472 1 -1.03 1 c -0.56 0 -1 -0.442 -1 -1 v -0.969 C 5 5.473 5.44 5 6 5 Z m 4 0 c 0.559 0 1 0.473 1 1.031 V 7 c 0 0.558 -0.441 1 -1 1 c -0.558 0 -1 -0.442 -1 -1 v -0.969 C 9 5.473 9.442 5 10 5 Z M 3 9.07 c 0.997 0.637 4.017 0.917 5 0.917 c 0.984 0 3.805 0.051 5 -0.917 v 0.5 c 0 0.68 -1.744 1.404 -5 1.404 c -3.256 0 -5 -0.872 -5 -1.404 Z");
    } else {
      setChosenColor(["#FF7ADC", "#FFC7F0", "#FF94E2"]);
      setShape("path://M 8 1 a 7 7 0 1 0 0 14 A 7 7 0 0 0 8 1 Z M 5.531 4.719 C 6.266 4.719 7 5.165 7 6.03 c -1.5 -0.338 -3.125 1.733 -3 0 c 0.063 -0.866 0.797 -1.312 1.531 -1.312 Z m 4.938 0 c 0.734 0 1.469 0.446 1.531 1.312 c 0.125 1.733 -1.5 -0.338 -3 0 c 0 -0.866 0.734 -1.312 1.469 -1.312 Z M 3 9.03 c 2 1.304 7.987 1.304 10.031 0 l -0.03 0.531 c -0.037 0.43 -1 3.376 -5 3.407 c -4 0.031 -5 -2.78 -5 -3.313 V 9.03 Z");
    }
  }, [resultingPopularity]);

  var option = {
    series: [{
      type: 'liquidFill',
      data: [resultingPopularity, resultingPopularity-0.1, resultingPopularity-0.3],
      amplitude: resultingPopularity*30,
      shape: shape,
      outline: {
        show: false
      },
      backgroundStyle: {
        borderWidth: 0,
        borderColor: 'red',
        color: 'white'
      },
      label: {
        formatter: "Song Popularity\n\n\n\n\n\n\n\n\n\n\nValue: "+resultingPopularity,
        fontSize: 40,
        color: "white"
      },
      color: [...chosenColor],
    }]
  };

  return (
    <div className="vis3-container">
      <div className="vis3-title-container">
        <p className="vis3-title-text">Lets See How We Can Make</p>
        <select className="vis3-title-select" onChange={(e) => setChosenGenre(e.target.value)}>
          <option value="Children's Music">Children's Music</option>
          <option value="Soundtrack">Soundtrack</option>
          <option value="Comedy">Comedy</option>
          <option value="Folk">Folk</option>
          <option value="Electronic">Electronic</option>
          <option value="Indie">Indie</option>
          <option value="Hip-Hop">Hip-Hop</option>
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Rap">Rap</option>
          <option value="Jazz">Jazz</option>
          <option value="Soul">Soul</option>
          <option value="Classical">Classical</option>
          <option value="World">World</option>
          <option value="Alternative">Alternative</option>
          <option value="R&B">R&B</option>
          <option value="Blues">Blues</option>
          <option value="Anime">Anime</option>
          <option value="Reggae">Reggae</option>
          <option value="Reggaeton">Reggaeton</option>
          <option value="Ska">Ska</option>
          <option value="Dance">Dance</option>
          <option value="Country">Country</option>
          <option value="Opera">Opera</option>
          <option value="Movie">Movie</option>
          <option value="A Capella">A Capella</option>
        </select>
        <p className="vis3-title-text">Popular!</p>
      </div>
      <div className="vis3-content-container">
        <ReactECharts option={option} style={{height: "80vh"}}/>
        <div>
          <h2 style={{margin: "0 auto 2rem auto"}}>Adjust Settings</h2>
          <h3 className="vis3-slider-label">Adjust Danceability</h3>
          <input 
            id="typeinp" type="range" className="vis3-slider" step="0.25"
            min="0"
            max="1"
            defaultValue={chosenDanceability}
            onMouseUp={(event) => setChosenDanceability(parseFloat(event.target.value))}
          />
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <h4>Lower</h4>
            <h4 style={{float:"right"}}>Higher</h4>
          </div>
          <h3 className="vis3-slider-label">Adjust Energy</h3>
          <input 
            id="typeinp" type="range" className="vis3-slider" step="0.25"
            min="0"
            max="1"
            defaultValue={chosenEnergy}
            onMouseUp={(event) => setChosenEnergy(parseFloat(event.target.value))}
          />
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <h4>Lower</h4>
            <h4 style={{float:"right"}}>Higher</h4>
          </div>
          <h3 className="vis3-slider-label">Adjust Valence</h3>
          <input 
            id="typeinp" type="range" className="vis3-slider" step="0.25"
            min="0"
            max="1"
            defaultValue={chosenValence}
            onMouseUp={(event) => setChosenValence(parseFloat(event.target.value))}
          />
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <h4>Lower</h4>
            <h4 style={{float:"right"}}>Higher</h4>
          </div>
          <h3 className="vis3-slider-label">Adjust Liveness</h3>
          <input 
            id="typeinp" type="range" className="vis3-slider" step="0.25"
            min="0"
            max="1"
            defaultValue={chosenLiveness}
            onMouseUp={(event) => setChosenLiveness(parseFloat(event.target.value))}
          />
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <h4>Lower</h4>
            <h4 style={{float:"right"}}>Higher</h4>
          </div>
          <h3 className="vis3-slider-label">Adjust Speechiness</h3>
          <input 
            id="typeinp" type="range" className="vis3-slider" step="0.25"
            min="0"
            max="1"
            defaultValue={chosenSpeechiness}
            onMouseUp={(event) => setChosenSpeechiness(parseFloat(event.target.value))}
          />
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <h4>Lower</h4>
            <h4 style={{float:"right"}}>Higher</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visualization3;