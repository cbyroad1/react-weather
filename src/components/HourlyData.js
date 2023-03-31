import React from 'react'

export default function HourlyData(props) {


    return (
        <div className='hourly-data-section'>
            {
            props.hourly && (
                <div>
                    <h3>The Weather in {props.coor.name} Today</h3>
                    {props.loading ? (<p>Loading...</p>): (
                        props.hourly.slice(0, 8).map(item => {
                            let date = new Date(item.dt_txt);
                            let hour = date.toLocaleTimeString('en-US');
    
                            return(
                            <div className="hourly-data-cards" key={item.dt}>
                                <div className="hourly-weather">   
                                    <div><img className='hourly-img' src = {`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].main}/> </div>
                                    <div>{item.weather[0].main}</div>
                                </div>
                                <div className="hourly-time"><h4>{hour}</h4></div>
                                <div className="hourly-temps">
                                    <p>{item.main.temp}</p>
                                    <p>feels like {item.main.feels_like} F</p>
                                </div>
                            </div>
                            )
                        })
                    )}
                </div>
            )}
        </div>
    )
}