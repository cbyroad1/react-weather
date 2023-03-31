import React from 'react'


export default function WeatherForm (props) {


    return(
        <form className='search-form' onSubmit={props.sendQuery}>
            <label>Enter Your City</label>
            <input id="search-input" type='text' name="city" onChange={props.getQuery}></input>
            <button id="search">Search</button>
        </form>
    )
}