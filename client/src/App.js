import React, { Component } from 'react'
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    lat: 21.436057,
    lon: -157.788867,
    status: 'Looking for location...'
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        status: 'Location found...updating server'
      })
    })
    setInterval(() => {
      this.sendPoi()
    },1000)
}


  sendPoi = () => {
    let name = window.location.origin;
    console.log(this.state);
    axios.get(`/api/gps/${this.state.lat}/${this.state.lon}/${name}`)
    .then(res=> {
      console.log(res);
    })
    .catch(err => {
      console.log('err');
    })
  }


  render() {
    return (
      <div className="App">
        <h2>{this.state.status}</h2>
      </div>
    )
  }
}

export default App
