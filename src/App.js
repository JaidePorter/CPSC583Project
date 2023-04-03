import './App.css';
import logo from './logo.svg';
import ReactECharts from 'echarts-for-react';
import Bryce from './Bryce';
import React from "react";
import Visualization3 from './Visualization3';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Visualization3/>
      <Bryce/>
    </div>
  );
}

export default App;
