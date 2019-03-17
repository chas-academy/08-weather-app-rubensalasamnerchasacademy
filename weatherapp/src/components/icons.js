import React from 'react';
import Sun from '../assets/icons/Sunwhite.png';
import Snowflake from '../assets/icons/Snowflakewhite.png';
import Wind from '../assets/icons/Windwhite.png';
import CloudSun from '../assets/icons/CloudSunwhite.png';
import CloudRain from '../assets/icons/CloudRainwhite.png';
import CloudMoon from '../assets/icons/CloudMoonwhiteHQ.png';
import CloudFog from '../assets/icons/CloudFogwhite.png';
import Cloud from '../assets/icons/Cloudwhite.png';
import Fog from '../assets/icons/Cloudfogwhitey.png';


const icons = (props) => {

    let icon = null;
    switch (props.icon) {
        case ('clear-day'):
            icon = Sun;
            break;
        case ('snow'):
            icon = Snowflake;
            break;
        case ('wind'):
            icon = Wind;
            break;
        case ('partly-cloudy-day'):
            icon = CloudSun;
            break;
        case ('rain'):
            icon = CloudRain;
            break;
        case ('partly-cloudy-night'):
            icon = CloudMoon;
            break;
        case ('cloud-Fog'):
            icon = CloudFog;
            break;
        case ('cloudy'):
            icon = Cloud;
            break;
        case ('fog'):
            icon = Fog;
            break;
    }

    return (

        <img src={icon} alt=""></img>
   
   )
}


export default icons