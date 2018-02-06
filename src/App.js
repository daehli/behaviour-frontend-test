import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import List from './List'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Front-end test Behaviour</h1>
        </header>
        <div className="App-intro">
          <List />
        </div>
      </div>
    )
  }
}

export default App
