import React, { Component } from 'react'
import './App.css';
import axios from 'axios';


function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

class App extends Component {
  state = {
    lat: 21.436057,
    lon: -157.788867,
    status: 'Looking for location...',
    name: '',
    count: ''
  }

  componentDidMount() {
    let name = makeid();
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        status: 'Location found...updating server',
        name: name,
        count: 1
      })
    })
    setInterval(() => {
      this.sendPoi()
    },1000)
}


  sendPoi = () => {
    let count = 1;
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        count: count +=1
      })
    })

    axios.get(`/api/gps/${this.state.lat}/${this.state.lon}/${this.state.name}/${this.state.count}`)
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
        <h2>ID: {this.state.name}</h2>
        <h3>Location updated count: {this.state.count}</h3>
      </div>
    )
  }
}

export default App
