import React, { Component } from 'react';
import Icons from './icons';
import '../App.css';

export default class Mainweather extends Component {
    
    testing = () => {
        console.log('testing');
    }

    test = () => {
        console.log(this.props.geodaily)
    }

    componentDidMount() {
        
    }

    render() {
        const { daily } = this.props
        const { geodaily } = this.props
        const { test } = this.props
        

        const mainWeather = daily.length ? (
            <div className="container mainweather">
                <div className="row">
                    <div className="card mx-auto ">
                        <img src="" alt="" className="card-img-top "/>
                        <div className="card-body text-light">
                        <p className="card-text">{daily[0]}</p>
                            <h5 className="card-title">{daily[1]}</h5>
                            <h1 className="card-text display-3">{daily[2]}°C</h1>
                            <p className="card-text"><Icons icon={daily[3]}></Icons></p>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
        ) : (
             <div className="container mainweather">
                <div className="row">
                    <div className="card mx-auto ">
                        <img src="" alt="" className="card-img-top"/>
                        <div className="card-body text-light p-3">
                            <p className="card-text">{geodaily[2]}</p>
                            <h5 className="card-title">{geodaily[0]}</h5>
                            <h1 className="card-text display-3">{geodaily[1]}°C</h1>
                            <p className="card-text"><Icons icon={geodaily[3]}></Icons></p>
                        </div>
                    </div>
                </div>
            </div>
        )

        
      /*   console.log(typeof mainWeather); */
        /* console.log(mainWeather); */
        /* console.log(this.props) */
        return (
            <div>
                 {mainWeather}
            </div>
           
        )
    }
 
}