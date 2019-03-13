import React from 'react';
import Sun from '../assets/icons/Sun.svg';
import Snowflake from '../assets/icons/Snowflake.svg';
import Wind from '../assets/icons/Wind.svg';
import CloudSun from '../assets/icons/CloudSun.svg';
import CloudRain from '../assets/icons/CloudRain.svg';
import CloudMoon from '../assets/icons/CloudMoon.svg';
import CloudFog from '../assets/icons/CloudFog.svg';



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
    }

    return (

        <img src={icon} alt=""></img>
   
   )
}


export default icons