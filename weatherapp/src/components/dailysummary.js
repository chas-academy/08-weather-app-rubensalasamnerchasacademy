import React from 'react';
import Icons from './icons';


function dailysummary ({hourly}) {
    const geohourly = hourly.geohourly;
    const searchhourly = hourly.hourly;
    
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
                
                <div className="dailycardcontainer text-light pt-3">
                    <p>{new Date(data.time * 1000).toLocaleString('en-EN').substring(11,16)}</p>
                    <p className="lead h6"><strong> {Math.ceil(data.temperature)} °C </strong></p>
                    <p>{data.summary}</p>
                    <p><Icons icon={data.icon}></Icons></p>
                </div>
                )
            })
        } else {
            weatherForecast = (<p>...Loading</p>)
        }

    return (
            
            <div className="gridcontainer">
                
                {weatherForecast}
            </div>
    )
}

export default dailysummary;