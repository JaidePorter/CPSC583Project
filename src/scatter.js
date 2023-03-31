import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import * as d3 from 'd3';


const ScatterPlot = () => {
  const [selectedFeature, setSelectedFeature] = useState("valence"); // set your initial feature here
  const [data, setData] = useState([]);
  const chartRef = useRef(0);


  useEffect(() => {
    d3.csv('./Cleaneddata.csv').then((d) => {
        setData(d)
      });
    
    const chart = echarts.init(chartRef.current);

    const genreColorMap = {
        "Children's Music": "#e41a1c",
        "Soundtrack": "#377eb8",
        "Comedy": "#4daf4a",
        "Folk": "#984ea3",
        "Electronic": "#ff7f00",
        "Indie": "#ffff33",
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
      
      
      const option = {
        xAxis: {
          type: 'value',
          name: selectedFeature,
        },
        yAxis: {
          type: 'value',
          name: 'popularity',
        },
        series: [
          {
            type: 'scatter',
            data: data,
            itemStyle: {
              normal: {
                color: function (params) {
                  return genreColorMap[params.data.genre];
                },
              },
            },
            encode: {
              tooltip: [1, 2, 3, 4],
            },
            symbolSize: '1'
            
            // function (data) {
            //   return data.duration_ms_normalized;
            // },
          },
        ],
      };
      
      chart.setOption(option);
  
      return () => {
        chart.dispose();
      };
    }, 
    
    [selectedFeature, data]);

  return (
    <div>
      <div>
        Select feature:
        <select value={selectedFeature} onChange={(e) => setSelectedFeature(e.target.value)}>
          <option value="valence">valence </option>
          <option value="acousticness">acousticness</option>
          <option value="danceability">danceability</option>
          <option value="energy">Energy</option>
          <option value="instrumentalness">Instrumentalness</option>
          <option value="liveness">loudness</option>
          <option value="tempo">tempo</option>
          <option value="loudness">loudness</option>
          <option value="speechiness">speechiness</option>
          
          {/* add more features here */}
        </select>
      </div>
      <div ref={chartRef} style={{ width: '100%', height: '800px' }}></div>
    </div>
  );
};

export default ScatterPlot;
