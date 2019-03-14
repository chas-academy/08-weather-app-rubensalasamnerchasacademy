import React from 'react';
import Icons from './icons';

function dailyweather({hourly}) {
    console.log(hourly);
    const geohourly = hourly.geohourly;
    console.log(geohourly);
    const searchhourly = hourly.hourly;
    console.log(searchhourly);
    /* console.log(props); */
    
    
    let weather = []

    if(searchhourly.length) {
        for(let i = 0; i < 24; i += 3) {
            if(searchhourly[i]) {
                weather.push(searchhourly[i])
            } 
        }
    } else {
        for(let i = 0; i < 24; i += 3) {
            if(geohourly[i]) {
                weather.push(geohourly[i])
            } 
        }
    }
    
 

    let weatherForecast;
        if (weather.length > 0) {
            weatherForecast = weather.map(data => {
                return (
                
                <div className="dailycardcontainer text-light p-5">
                    <p>{new Date(data.time * 1000).toLocaleString('it-IT').substring(11,16)}</p>
                    <p> {Math.ceil(data.temperature)} °C</p>
                    <p>{data.summary}</p>
                    <p><Icons icon={data.icon}></Icons></p>
                </div>
                )
            })
        } else {
            weatherForecast = (<p>...Loading</p>)
        }

    return (
        
            
            <div className="gridcontainer">{weatherForecast}</div>
      
        
        
        
    )

    
    
}
/* 
   <div >
            <h1>Daily Forecast</h1>
            <div >
                
                {weatherForecast}
                {console.log(weatherForecast)}
            </div>
        </div>
 */

export default dailyweather;