import React from 'react';
import logo from './logo.svg';
import './App.css';

import IslandTable from './IslandTable';
import BuyTable from './BuyTable';

function App() {
  return (
    <React.Fragment>
      <IslandTable />
      <BuyTable />
    </React.Fragment>
    // <div className="App">
    //   <header className="App-header">
        
    //   </header>
    // </div>
  );
}

export default App;
