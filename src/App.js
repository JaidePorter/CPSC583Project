import './App.css';
import Visualization3 from './Visualization3';
import React from "react";
import Visualization2 from './Visualization2';
import ScatterPlot from './scatter';

function App() {
  return (
    <div className="App">
      <ScatterPlot/>
      <Visualization2/>
      <Visualization3/>
    </div>
  );
}

export default App;
