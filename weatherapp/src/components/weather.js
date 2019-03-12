import React, { Component } from 'react';

class weather extends Component {

    state = {
        geodaily: [],
        geosummary: '',
        geoicon: '',
        geotemp: '',
        geotimezone: '',
        geohourly: [],
        secretKey: '1a2dd2744632799c9381abfafde3d1bc',
        locationsummary: [],
    }

    componentDidMount() {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.currentPosition)
        }
    }

    currentPosition = (currentPosition) => {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1a2dd2744632799c9381abfafde3d1bc/${currentPosition.coords.latitude},${currentPosition.coords.longitude}?units=si`)
        .then(res => res.json())
        .then(data => {
            
            this.setState({
                geodaily: data.daily.data,
                geosummary: data.currently.summary,
                geoicon: data.currently.icon,
                geotemp: data.currently.temperature,
                geotimezone: data.timezone,
                geohourly: data.hourly.data,
                locationsummary: [data.currently.summary, data.currently.temperature, data.timezone, data.currently.icon],
                
            })
            console.log(this.state);
        })
        
        
    }
}