import React, {useState } from 'react'
import axios from 'axios'
import HourlyData from './HourlyData';
import DailyData from './DailyData';
import WeatherForm from './WeatherForm';

export default function Weather(){
    const [ query, setQuery ] = useState();
    const [ coor, setCoor ] = useState();
    const [ hourly, setHourly ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    
    
    const fetchData = async () => {
        setLoading(true);
        if (!coor) {
            return;
        }

        const params = {
            appid: process.env.REACT_APP_OPENWEATHER_APIKEY,
            lat: coor.lat,
            lon: coor.lon,
            units: 'imperial'
        }
          
        await axios.get('https://api.openweathermap.org/data/2.5/forecast', {params})
        .then(response => {
            console.log(response);
            console.log(response.data.list);
            const weather = response.data.list;
            
            setHourly(weather);
        }).catch(error => {
            console.log(error);
        });
        setLoading(false);
    };



    const getQuery = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setQuery(query=> ({...query, [name]:value}))
    }

    const sendQuery = async (e) => {
        e.preventDefault();

        const params = {
            cityname: query.city,
            limit: 1,
            appid: '9c9941065b8c9d77bad4fb7af2ec4b8e'
        }

        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${params.cityname}&limit=${params.limit}&appid=${params.appid}`

        await axios.get(url)
        .then(response => {
            const coor = response.data[0]
            console.log(response);
            setCoor({
                lat: coor.lat,
                lon: coor.lon,
                name: coor.name
            })
            console.log('success');
            fetchData();
        }).catch(error => {
            console.log(error);
        });
    };



    return(
        
        <div className='main-section'>
            <WeatherForm sendQuery={sendQuery} getQuery={getQuery}/>
            <HourlyData hourly={hourly} coor={coor} loading={loading}/>
            <DailyData weather={hourly}/>
        </div>
    )
}
