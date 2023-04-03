import './App.css';
import logo from './logo.svg';
import ReactECharts from 'echarts-for-react';
import Bryce from './Bryce';
import React from "react";
import Visualization3 from './Visualization3';
import ScatterPlot from './scatter';

function App() {
  return (
    <div className="App">
      <ScatterPlot/>
      <Visualization3/>
      <Bryce/>
    </div>
  );
}

export default App;
