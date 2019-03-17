import React, { Component } from 'react';
import Navbar from './navbar';
import Icons from './icons';
import Dailyweather from './dailyweather';
import Mainweather from './mainweather';
import Chart from './chart';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Dailysummary from './dailysummary';
import Sunrise from '../assets/icons/Sunrisewhite.png';
import Sunset from '../assets/icons/Sunsetwhite.png';

const darkSkyUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
const darkSkyKey = '1a2dd2744632799c9381abfafde3d1bc';

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
        fetch(`${darkSkyUrl}${darkSkyKey}/${currentPosition.coords.latitude},${currentPosition.coords.longitude}?units=si`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                geodaily: data.daily.data,
                geosummary: data.currently.summary,
                geoicon: data.currently.icon,
                geotemp: data.currently.temperature,
                geotimezone: data.timezone,
                geohourly: data.hourly.data,
                locationsummary: [data.currently.summary, data.currently.temperature, data.timezone, data.currently.icon, data.currently.time],

                
            })
        })
    }

    startSearch = (e) => {
        
        e.preventDefault();
        
        let searchString = e.target.elements.search.value == null ? (
            e
        ) : (
             e.target.elements.search.value
        )
        
        fetch(`https://www.meteoblue.com/en/server/search/query3?query=${searchString}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Service not available');
            }
        })
        .then(data => {
            this.setState({
            lat: data.results[0].lat,
            lon: data.results[0].lon,
            searchstring: searchString
          })
          const lat = this.state.lat;
          const lon = this.state.lon;
          return fetch(`${darkSkyUrl}${darkSkyKey}/${lat},${lon}?units=si`)
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
        .catch(error => console.log("Service unavailable:", error.message));
      }

    convert = (e) => {
        if (e.target.innerHTML === "Celsius") {
            e.target.innerHTML = 'Fahrenheit';
        } else {
            e.target.innerHTML = 'Celsius'
        }
        this.setState({
            celsius: !this.state.celsius
        })
    }

    saveToLocalStorage = () => {

        localStorage.setItem(this.state.searchstring, JSON.stringify(this.state))
    }

    showLocalStorage = () => {

        let holder = {}; 
        for (let i = 0; i < localStorage.length; i++) {
           
           holder[localStorage.key(i)] = JSON.parse(localStorage.getItem(localStorage.key(i)));
          
        }
        this.setState({
            allKeys: holder,
        })
    }

    // Not currently working
    showSavedForecast = (e) => {
        
        console.log(e.target.id)
        this.startSearch(e)
        for (Object.keys in this.state.allKeys) {
            if(Object.keys === e.target.id) {
                console.log(Object.keys);
            }
        }
        
    }


    render() {

        let allSearchedKeys = [];
        
        Object.keys(this.state.allKeys).forEach(function(key) {
            allSearchedKeys.push(key);
        });
     
        const savedSearches = allSearchedKeys.length ? (allSearchedKeys.map(item => {
            return(
                <div className="flexcontainer clear">
                    <h3 className="text-light m-2">{item.charAt(0).toUpperCase() + item.slice(1)}</h3><button id={item} onClick={this.showSavedForecast} className="btn btn-primary btn-sm m-2">Show Forecast</button>
                </div>
            )
        })   
        ) : (
            null
        )

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
                {savedSearches}
                </Tab>
            </Tabs>
        )

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const weeklyForecast = this.state.daily.length ? (
            this.state.daily.map(day => {
                return (
                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="box-part text-center text-light">
                            <i className="fa fa-3x" aria-hidden="true"><Icons icon={day.icon}></Icons></i>
                            <div className="title">
                            </div>
                             <div className="text">
                                <p><b>Temphigh:</b> {this.state.celsius ? ((day.temperatureHigh - 32) * 5 / 9).toFixed() + ' °F' : day.temperatureHigh.toFixed() + ' °C'}</p>
                                <p><b>Templow:</b> {this.state.celsius ? ((day.temperatureLow - 32) * 5 / 9).toFixed() + ' °F' : day.temperatureLow.toFixed() + ' °C'}</p>
                                <p><b>Windspeed:</b> {day.windSpeed}</p>
                                <p><b>Humidity:</b> {day.humidity}</p>
                                <p><img src={Sunrise}></img>:{new Date(day.sunriseTime * 1000).toLocaleString('en-EN').split(',')[1]}</p>
                                <p><img src={Sunset}></img>:{new Date(day.sunsetTime * 1000).toLocaleString('en-EN').split(',')[1]}</p> 
                            </div>
                        </div>
                    </div>	 
                )
            })
            
          
        ) : (
            
            this.state.geodaily.map(day => {
                return (
                
                    <div className="col-lg-auto col-md-4 col-sm-6 col-xs-12 ">
                        <div className="box-part text-center text-light">
                        <h5>{new Date(day.time * 1000).toLocaleDateString('en-EN', options).split(',')[0]}</h5>
                            <i className="fa fa-3x" aria-hidden="true"><Icons icon={day.icon}></Icons></i>
                            <div className="title text-light">
                        </div>
                        <div className="text text-light">
                            <p><b>Temphigh:</b> {this.state.celsius ? ((day.temperatureHigh - 32) * 5 / 9).toFixed() + ' °F' : day.temperatureHigh.toFixed() + ' °C'}</p>
                            <p><b>Templow:</b> {this.state.celsius ? ((day.temperatureLow - 32) * 5 / 9).toFixed() + ' °F' : day.temperatureLow.toFixed() + ' °C'}</p>
                            <p><b>Windspeed:</b> {day.windSpeed}</p>
                            <p><b>Humidity:</b> {day.humidity}</p>
                            <p><img src={Sunrise}></img>:{new Date(day.sunriseTime * 1000).toLocaleString('en-EN').split(',')[1]}</p>
                            <p><img src={Sunset}></img>:{new Date(day.sunsetTime * 1000).toLocaleString('en-EN').split(',')[1]}</p>
                        </div>
                        </div>
                    </div>	 
                        )
            })
        )
        
        return (
            <div>
                <form className="md-form active-pink active-pink-2 mb-3 mt-0 searchbar" onSubmit={this.startSearch}>
                    <input className="form-control testing" name="search" type="text" placeholder="Location .." aria-label="Search" autoComplete="off"></input>
                    <button className="btn btn-primary btn-sm" type="submit">Search</button>
                </form>
                <div>
                    <div className="maincontainer">
                            <div className="weathermain">
                                <Mainweather daily={this.state.searchsummary} geodaily={this.state.locationsummary}></Mainweather>
                                <button className="btn btn-primary btn-sm"onClick={this.saveToLocalStorage}>Save</button> 
                            </div>
                            <div className="tabsmain ">
                                {tabs}
                            </div>
                    </div>
                </div>
                <h1 className="weeklyforecast text-light">Weekly Forecast</h1><button className="btn btn-secondary btn-sm"onClick={this.convert}>Celsius</button>
                <div className="container weeklycontainer"><div className="row justify-content-md-center">{weeklyForecast}</div></div>
            </div>
        )
    }
}