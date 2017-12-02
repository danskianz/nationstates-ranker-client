import React, { Component } from 'react';

import gameLogo from './bannertitle.png';
import './App.css';
import './bootstrap.min.css';

import CurrentRankings from './CurrentRankings';

class App extends Component {

    render() {
        return (
                <div className="App">
                    <header className="App-header">
                        <img src={gameLogo} className="Game-logo" alt="logo" />
                        <h1 className="App-title">Custom Ranker of the Northern Redlands</h1>
                    </header>
                    <p className="App-intro">
                        Made by the Borderlands of Kurwianath
                    </p>
                    <CurrentRankings />
                </div>
                );
    }
}

export default App;
