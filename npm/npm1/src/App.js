import React from 'react';
import './App.css';
import ButtonAppBar from './appBar'
//import AcceptTermsPanel from "./components/AcceptTermsPanel"
import CircularStatic from "./components/CircularStatic"

//const panelNames = ['prvni', 'druhy', 'treti']
//return (
//<div>
//<ButtonAppBar/>
//{ panelNames.map((name, index) => <AcceptTermsPanel key={index}/>)}
//<CircularStatic />

function App() {
  return (
  <div>
    <ButtonAppBar/>

    <CircularStatic />
  </div>
  );
}

export default App;
