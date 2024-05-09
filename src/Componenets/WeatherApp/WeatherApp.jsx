import React, { useState } from 'react'
import "./WeatherApp.css"
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import Drizzle_icon from "../Assets/drizzle.png";
import Humibity_icon from "../Assets/humidity.png";
import rain_icon  from '../Assets/rain.png';
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png"

const WeatherApp =  () => {
    const[wIcon, setWIcon]= useState(cloud_icon);
    const[city,setCity]=useState('')
    const[weatherData,setWeatherData]=useState(null);

    let api_key="8a9670c7896ba7e494456225751509e7";
    // const search=async()=>{
    //     const element=document.getElementsByClassName("cityInput")
    //     if(element[0].value==""){
    //         return 0;
    //     }
    //     let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key} `;
    //      let response= await fetch(url);
    //      let data= await response.json();
    //      const humidity=document.getElementsByClassName("humidity-percentage");
    //      const wind =document.getElementsByClassName("wind-rate");
    //      const temp=document.getElementsByClassName("weather-temp");
    //      const location=document.getElementsByClassName("weather-location") 
    //      humidity[0].innerHTML= data.main.humidity+"%";
    //      wind[0].innerHTML=Math.floor(data.wind.speed)+"km/h";
    //      temp[0].innerHTML=Math.floor(data.main.temp)+"°C";
    //      location[0].innerHTML =data.name;

    //      if(data.weather[0].icon==="01d"||data.weather[0].icon==="01n"){
    //      setWIcon(clear_icon);
    //      }
    //      else if(data.weather[0].icon==="02d"||data.weather[0].icon==="02n")
    //     {
    //         setWIcon(cloud_icon);
    //     }
    //     else if(data.weather[0].icon==="03d"||data.weather[0].icon==="03n")
    //     {
    //         setWIcon(Drizzle_icon);
    //     }
    //     else if(data.weather[0].icon==="04d"||data.weather[0].icon==="04n")
    //     {
    //         setWIcon(Drizzle_icon);
    //     }
    //     else if(data.weather[0].icon==="09d"||data.weather[0].icon==="09n")
    //     {
    //         setWIcon(rain_icon);
    //     }
    //     else if(data.weather[0].icon==="10d"||data.weather[0].icon==="10n")
    //     {
    //         setWIcon(rain_icon);
    //     }
    //     else if(data.weather[0].icon==="13d"||data.weather[0].icon==="13n")
    //     {
    //         setWIcon(snow_icon);
    //     }
    //     else
    //     {
    //         setWIcon(clear_icon);
    //     }


    // }
    const fetchData=async()=>{
        try {
            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`);
            if (!response.ok) {
                throw new Error('City not found');
              }
            const data= await response.json();
            setWeatherData(data)
            console.log(data)
        } catch (error) {
           console.log(error) 
        }
    }
    const handleChange =(e)=>{
        setCity(e.target.value)
    }
  return (
    <div className="container">
        <div className="top-bar">
            <input type="text" value={city} className='cityInput' placeholder='Search' onChange={handleChange} />
            <div className="search-icon" onClick={fetchData}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={cloud_icon} alt="" />
        </div>
        {weatherData &&(
            <>
            <div className="weather-temp">{Math.floor(weatherData.main.temp)+"°C"}</div>
        <div className="weather-location">{weatherData.name}</div>
        <div className="data-container">
            <div className="element">
                <img src={Humibity_icon}  className="icon" alt="" />
                <div className="data">
                    <div className="humidity-percentage">{Math.floor(weatherData.main.humidity)+"%"}</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon}  className="icon" alt="" />
                <div className="data">
                    <div className="wind-rate">{Math.floor(weatherData.wind.speed)+"km/h"}</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
            
            </>
           
        )}
        
      
    </div>
  )
}

export default WeatherApp
