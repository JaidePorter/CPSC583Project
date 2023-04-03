import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts'; 
import data from './data.json';
import "./scatter.css"

function ScatterPlot() {

    const [selectedFeature, setSelectedFeature] = useState("valence"); // set your initial feature here
    const [selectedGenres, setSelectedGenres] = useState({
          "Children's Music": false,
          "Soundtrack": false,
          "Comedy": false,
          "Folk": false, 
          "Electronic": false,
          "Indie": false,
          "Hip-Hop": false,
          "Pop": true,
          "Rock": true,
          "Rap": false,
          "Jazz": false,
          "Soul": false,
          "Classical": true,
          "World": false,
          "Alternative": false,
          "R&B": false,
          "Blues": false,
          "Anime": false,
          "Reggae": false,
          "Reggaeton": false,
          "Ska": false,
          "Dance": false,
          "Country": false,
          "Opera": false,
          "Movie": false,
          "A Capella": false,
       
      });

  
    const chartRef = useRef(0); // 

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
    



  
    useEffect(() => {

    
    const chart = echarts.init(chartRef.current);

    // featurs array
    let trackNames = data.map((d) => d.track_name);
    let popularity = data.map((d) => d.popularity);
    let valence = data.map((d) => d.valence);
    let acousticness = data.map((d) => d.acousticness);
    let danceability = data.map((d) => d.danceability);
    let energy = data.map((d) => d.energy);
    let instrumentalness = data.map((d) => d.instrumentalness);
    let liveness = data.map((d) => d.liveness);
    let tempo = data.map((d) => d.tempo);
    let loudness = data.map((d) => d.loudness);
    let speechiness = data.map((d) => d.speechiness);
    // let duration_ms_normalized = data.map((d) => d.duration_ms_normalized);
    let genre = data.map((d) => d.genre);
    // const filteredData = data.filter(d => selectedGenres.includes(genre));
      // Create array for selected feature

      let seriesData = [];
      

      const features = {
        valence: valence,
        acousticness: acousticness,
        danceability: danceability,
        energy: energy,
        instrumentalness: instrumentalness,
        liveness: liveness,
        tempo: tempo,
        loudness: loudness,
        speechiness: speechiness,
        genre: genre,
        
      };

      const option = {
        // legend: {
        //   show: true,
        //   right: 5,
        //   top: 20,
        //   bottom: 20,
     
        //   // data: seriesData.map(category => category.genre),
        //   textStyle: {
        //     color: '#333'
        //   },
          // itemGap: 20
        // },
        xAxis: {
          type: 'value'
        //   name: selectedFeature,
        //   nameLocation: 'middle',
        //   nameTextStyle: {
        //     fontSize: 18
        //   },
        },
        yAxis: {
          type: 'value',
          name: 'popularity',
          nameLocation: 'middle',
          nameGap: 50, // adjust this value as needed to center the label
          nameTextStyle: {
            fontSize: 30
          }
        },

        series: [
          {
            type: 'scatter',
            data: (() => {
                // let seriesData = [];
                const xData = features[selectedFeature]; // get x data based on selected feature
                for (let i = 0; i < xData.length; i++) {

                  if (selectedGenres[genre[i]]) { // check if genre is selected
                    seriesData.push({
                      value: [xData[i], popularity[i]],
                      name: trackNames[i],
                      genre: genre[i],
                      symbolSize: "10",
                      itemStyle: {
                        color: genreColorMap[genre[i]]
                      }

                    });
                   
                  }
                }
                return seriesData;
            })(),
            // legendHoverLink: true,
            name: 'genre',
          },  
        ],

        tooltip: {
          trigger: 'item',
          position: 'top',
          formatter: function (params) {
            let trackName = params.name;
            let yAxisLabel = 'Popularity'; // replace with your y-axis label
            let yAxisValue = params.value[1];
            let xAxisValue = params.value[0];
            let g = params.data.genre; 
            
            return 'Song: '+ trackName + '<br />' + yAxisLabel + ': ' + yAxisValue + '<br />' + selectedFeature + ': ' + xAxisValue  +'<br />' + 'Genre: ' + g;
          },
             textStyle: {
            fontSize: '16px'
          }
        },

        
      };
      chart.setOption(option);
  
      return () => {
        chart.dispose();
      };
      
    }, [selectedFeature, selectedGenres] );
  
    return (
      <div>
      <div style= {{display: 'grid',  gridTemplateColumns: 'auto auto', marginLeft: "1em"}}>
        <div>
          <h1>Comparison of Popularity Scores across Different Music Genres</h1>
          <div ref={chartRef} style={{ width: '100%', height: '100%', backgroundColor: "white" }}></div>
        </div>
        <div className="filter-container">
             
             <h3>Select Genres:</h3>
             {Object.entries(genreColorMap).map(([genre, color]) => (
                  
                 <label key={genre} style={{display: "block", backgroundColor: color, color: color === "#000000" || color === "#00008b" ? "white" : "black", maxWidth: "100%", fontWeight: "bold", padding: "10px", borderRadius: "5px", marginBottom: "5px", display: "flex", alignItems: "center"}}>
                 <input
                     type="checkbox"
                     value ={genre}
                     checked={selectedGenres[genre]}
                     onChange={() => {
                       setSelectedGenres({
                         ...selectedGenres,
                         [genre]: !selectedGenres[genre]
                       });
                     }}
                     style={{ marginRight: "10px", width: "20px", height: "20px", backgroundColor: color, borderRadius: "5px", border: "none", outline: "none", cursor: "pointer"}}
                 />
                {genre}
                 </label>
                 
             ))}
             
             </div>
        </div>
        
        <div style={{textAlign: "center"  , marginBottom: '2%', fontSize: '30px' }}>
          Select feature: 
          <select value={selectedFeature} onChange={(e) => setSelectedFeature(e.target.value)} style={{ fontSize: "30px" , textAlign: "center", zIndex: 999}}>
            <option value="valence">Valence </option>
            <option value="acousticness">Acousticness</option>
            <option value="danceability">Danceability</option>
            <option value="energy">Energy</option>
            <option value="instrumentalness">Instrumentalness</option>
            <option value="liveness">Loudness</option>
            <option value="tempo">Tempo</option>
            <option value="loudness">Loudness</option>
            <option value="speechiness">Speechiness</option>
          </select>
        </div>
       
      </div>
      
      



    );
  }
  
  export default ScatterPlot;
  
