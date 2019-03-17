import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default class chart extends Component {

  render() {
    
    const weather = [];

    if(this.props.chartdata.hourly.length) {
      for(let i = 0; i < 24; i += 3) {
          if(this.props.chartdata.hourly[i]) {
              weather.push(this.props.chartdata.hourly[i])
          } 
      }
    } else {
      for(let i = 0; i < 24; i += 3) {
          if(this.props.chartdata.geohourly[i]) {
              weather.push(this.props.chartdata.geohourly[i])
          } 
      }
    }

    const chartData = this.props.chartdata.hourly.length ? (
        weather.map(item => {
            return(
                {name: item.time, temp: item.temperature, feels: item.apparentTemperature}
            )
        })
    ) : (
        weather.map(item => {
            return(
                {name: new Date(item.time * 1000).toLocaleString('it-IT').split(',')[1].substring(0, 6), temp: item.temperature, feels: item.apparentTemperature}
            )
        })
    )
    
    const renderLineChart = (
      <LineChart width={600} height={300} data={chartData}>
        <Line type="monotone" dataKey="temp" stroke="orange" />
        <Line type="monotone" dataKey="feels" stroke="red" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" stroke="white" />
        <YAxis stroke="white"/>
        <Tooltip />
      </LineChart>
    );
   
    return (
        
       renderLineChart
    )
  }
}

