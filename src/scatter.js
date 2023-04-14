import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts'; 
import data from './data.json';
import "./scatter.css"


function ScatterPlot() {

    const MAX_CHECKED_GENRES = 5;
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

  
    const chartRef = useRef(null); // 

    const genreColorMap = {
        "Children's Music": "#e41a1c",
        "Soundtrack": "#377eb8",
        "Comedy": "#4daf4a",
        "Folk": "#984ea3",
        "Electronic": "#ff7f00",
        "Indie": "#ffff29",   "Hip-Hop": "#a65628", "Pop": "#f781bf", "Rock": "#beaed4",  "Rap": "#dede00",  "Jazz": "#d0d0d0",
        "Soul": "#696969", "Classical": "#ff7f50", "World": "#b0e0e6", "Alternative": "#8b4513", "R&B": "#999999", "Blues": "#e6beff",
        "Anime": "#808000", "Reggae": "#ffd700", "Reggaeton": "#", "Ska": "#F64C72", "Dance": "#6b8e23", "Country": "#ffa07a",
        "Opera": "#ffb6c1", "Movie": "#2f4f4f", "A Capella": "#c71585"
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
    
    let genre = data.map((d) => d.genre);
    // const filteredData = data.filter(d => Object.values(selectedGenres).includes(d.genre));
  

      // let seriesData = [];
      

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
                let seriesData = [];
                const xData = features[selectedFeature]; // get x data based on selected feature
                for (let i = 0; i < xData.length; i++) {

                  if (selectedGenres[genre[i]] === true) { // check if genre is selected
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
        
          },  
        ],
        toolbox: {
          showTitle: true, // add title to toolbox
          feature: {
            dataZoom: {
              iconSize: [50, 50], // add iconSize to increase the size of the icons  
              iconStyle: {
                emphasis:{
        
                  shadowOffsetY: -0.5,
                  borderWidth: 3 ,
                }
              }
            }
          },
          right: '10%', // position of toolbox
          top: 'top'
        },

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
      <div class="grid-container">
        <div>
          <h1>Comparison of Popularity Scores across Different Music Genres</h1>
          <div ref={chartRef} class= "chart-container">  </div>
        </div>
        <div className="filter-container">
             
             <h3>Select Genres:</h3>
             {Object.entries(genreColorMap).map(([genre, color]) => (
                  
                  <label
                  key={genre}
                  style={{
                    display: "block",
                    backgroundColor: selectedGenres[genre] ? color : "transparent",
                    color: color ===  "black",

                  }}
                >
                  <input
                    type="checkbox"
                    value={genre}
                    checked={selectedGenres[genre]}
                    onChange={() => {
                      const checkedCount = Object.values(selectedGenres).filter(Boolean).length;
                      if (checkedCount < MAX_CHECKED_GENRES || selectedGenres[genre]) {
                        setSelectedGenres({
                          ...selectedGenres,
                          [genre]: !selectedGenres[genre],
                        });
                      }
                    }}

                  />
                  {genre}
                </label>
                 
             ))}
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

       
      </div>
      
      



    );
  }
  
  export default ScatterPlot;
  
