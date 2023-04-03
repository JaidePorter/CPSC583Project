import './App.css';
import logo from './logo.svg';
import ReactECharts from 'echarts-for-react';
import Bryce from './Bryce';
import React from "react";
import Visualization2 from './Visualization2';
import ScatterPlot from './scatter';

function App() {
  return (
    <div className="App">
      <ScatterPlot/>
      <Visualization2/>
      <Bryce/>
    </div>
  );
}

export default App;
