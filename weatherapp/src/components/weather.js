import React, { Component } from 'react';
import Navbar from './navbar';
import Icons from './icons';
import Dailyweather from './dailyweather';
import Mainweather from './mainweather';
import Chart from './chart';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Dailysummary from './dailysummary';

export default class weather extends Component {

    state = {
        geodaily: [],
        geosummary: '',
        geoicon: '',
        geotemp: '',
        geotimezone: '',
        geohourly: [],
        secretKey: '1a2dd2744632799c9381abfafde3d1bc',
        locationsummary: [],
        tempconverter: false,
        location: '',
        summary: '',
        icon: '',
        temp: '',
        daily: [],
        hourly: [],
        currentRadar: '',
        threehours: [],
        locationsummary: [],
        searchsummary: [],
        tempconverter: 'Fahrenheit',
        celsius: false,
        searchstring: '',
        allKeys: {},
        
    }

    componentDidMount() {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.currentPosition)
        }
    }

    currentPosition = (currentPosition) => {
        fetch(`https://but-of-cors.herokuapp.com/https://api.darksky.net/forecast/1a2dd2744632799c9381abfafde3d1bc/${currentPosition.coords.latitude},${currentPosition.coords.longitude}?units=si`)
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

    startSearch = (e) => {
        
        e.preventDefault();
        console.log("hej");
        const searchString = e.target.elements.search.value;
        e.preventDefault();
        fetch(`https://www.meteoblue.com/en/server/search/query3?query=${searchString}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
            lat: data.results[0].lat,
            lon: data.results[0].lon,
            
          })
          const lat = this.state.lat;
          const lon = this.state.lon;
          return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1a2dd2744632799c9381abfafde3d1bc/${lat},${lon}`)
        })
        .then(res => res.json())
        .then(data => {
          
          this.setState({
            summary: data.currently.summary,
            icon: data.currently.icon,
            temp: data.currently.temperature,
            daily: data.daily.data,
            hourly: data.hourly.data,
            searchsummary: [data.timezone, data.currently.summary, data.currently.temperature, data.currently.icon],
          })
        
        }) 
      
    }

    convert = () => {
        this.setState({
            tempconverter: !this.state.tempconverter
        })
    }

    saveToLocalStorage = () => {
        localStorage.setItem(this.state.searchstring, JSON.stringify(this.state))
        console.log(this.state.geohourly);
    }

    showLocalStorage = () => {

       
        let holder = {}; 
        for (let i = 0; i < localStorage.length; i++) {
           
           holder[localStorage.key(i)] = JSON.parse(localStorage.getItem(localStorage.key(i)));
          
        }
        this.setState({
            allKeys: holder,
        })
        
        console.log(holder);
       
    }


    render() {

        const tabs = (
            <Tabs defaultActiveKey="daily" id="outertab"  >
                <Tab eventKey="daily" title="TODAY">
                <Dailysummary hourly={this.state}></Dailysummary>
                </Tab>
                <Tab eventKey="Graph" title="GRAPH" className="graph">
                <Chart chartdata={this.state}></Chart>
                </Tab>
                <Tab eventKey="SavedForecasts" title="SAVED FORECASTS"  >
                <button className="btn btn-secondary btn-sm m-2 float-left"onClick={this.showLocalStorage}>Show Saved</button>
                </Tab>
            </Tabs>
        )
        const weatherData = this.state.daily.length ? (
            this.state.daily.map(day => {
                return (
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        
                        <div className="box-part text-center">
                            <img src=""></img>
                            <i className="fa fa-3x" aria-hidden="true"><Icons icon={day.icon}></Icons></i>
                            
                            <div className="title">
                            {day.summary}
                            </div>
                            
                            <div className="text">
                                <Icons icon={day.icon}></Icons>
                                <p>{day.icon}</p>
                                <p>Windspeed:{day.windSpeed}</p>
                                <p>Humidity: {day.humidity}</p>
                                <p>Sunrise:{new Date(day.sunriseTime * 1000).toLocaleString('it-IT')}</p>
                                <p>Sunset:{new Date(day.sunsetTime * 1000).toLocaleString('it-IT')}</p> 
                               {/*  <p>Sunrise:{day.sunriseTime}</p>
                                <p>Sunset:{day.sunsetTime}</p> */}
                                <p>Temphigh: {this.state.celsius ? ((day.temperatureHigh - 32) * 5 / 9).toFixed() + ' °F' : day.temperatureHigh.toFixed() + ' °C'}</p>
                                <p>Templow: {day.temperatureLow}</p>
                            </div>
                            
                            <a href="#"></a>
                            
                        </div>
                    </div>	 
                )
            })
            
          
        ) : (
            
            this.state.geodaily.map(day => {
                return (
                
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 weatherBg">
                        
                                <div className="box-part text-center">
                                    
                                <i className="fa fa-3x" aria-hidden="true"><Icons icon={day.icon}></Icons></i>
                                    
                                    <div className="title text-white">
                                    {day.summary}
                                    </div>
                                    
                                    <div className="text text-white">
                                        <p>Windspeed:{day.windSpeed}</p>
                                        <p>Humidity: {day.humidity}</p>
                                        <p>Sunrise:{new Date(day.sunriseTime * 1000).toLocaleString('it-IT')}</p>
                                        <p>Sunset:{new Date(day.sunsetTime * 1000).toLocaleString('it-IT')}</p>
                                        <p>Sunrise:{day.sunriseTime}</p>
                                        <p>Sunset:{day.sunsetTime}</p>
                                        <p>Temphigh: {this.state.celsius ? ((day.temperatureHigh - 32) * 5 / 9).toFixed() + ' °F' : day.temperatureHigh.toFixed() + ' °C'}</p>
                                        <p>Templow: {day.temperatureLow}</p>
                                        
                                    </div>
                                    
                                    <a href="#"></a>
                                    
                                </div>
                            </div>	 
                    	
                
       
                
                )
            })
        )
        return (
            <div>
                <Navbar></Navbar>
                <form onSubmit={this.startSearch}>
                    <input name="search" type="text" ></input>
                    <button type="submit">Search</button>
                </form>
                {tabs}
                <Mainweather daily={this.state.searchsummary} geodaily={this.state.locationsummary}></Mainweather>
                <button onClick={this.convert}>convert temp</button>
                <Dailyweather hourly={this.state}></Dailyweather>
                <div className="container"><div className="row">{weatherData}</div></div>
            </div>
        )
    }
}