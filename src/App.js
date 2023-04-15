import './App.css';
import React from "react";
import Homepage from './Homepage';
import Visualization1 from './Visualization1';
import Visualization2 from './Visualization2';
import Visualization3 from './Visualization3';

function App() {
  return (
    <div className="App">
      <Homepage/>
      <Visualization1/>
      <Visualization2/>
      <Visualization3/>
    </div>
  );
}

export default App;
