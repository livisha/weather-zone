import React, {useState, useEffect} from 'react';
import './weathers.css';
import WeatherCard from './weatherCard';
import ReactAnimatedWeather from 'react-animated-weather';
import {Line} from 'react-chartjs-2';

// Creating a default array to hold default values for the react animation widgets
const defaults = {
  icon: 'CLEAR_DAY',
  color: 'goldenrod',
  size: 80,
  animate: true
};

// Differect object array for storing the values of different weather-rainfall situations for the marking in the graph
const gr ={labels: ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Rainfall', 
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(100,50,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 40, 30, 10, 60, 74, 62, 21]
      } 
    ]
};

// Function created to change the weather animation according to the temperature stats present at that time using if else 
// and returning the animation using proper parameters.
function Greeting(props) {
  const t = props.temp;
  var temp="";
  if(t > 24){
    temp = 'CLEAR_DAY'
  }
  else if(t < 24 && t > 15 ){
    temp = 'RAIN'
  }
  else if(t < 15 && t > 10){
    temp = 'ARTLY_CLOUDY_DAY'
  }
  else{
    temp = 'SNOW'
  }

  return (<ReactAnimatedWeather
        icon= {temp}
        color={defaults.color}
        size={defaults.size}
        animate={defaults.animate}
      />);
}

// Weather function component using useSate hook for setting and initializing the state or different variables, parameters
// and using the values fetched from API's using the fetchdata() asynchronous function.
// The gr array of abjects is used to present data grphically.
// the data fetched is than passed to weatherCard.js for further use of data.
const Weather = () => {
    const [search, setSearch] = useState("Rajasthan");
    const [temp, settemp] = useState(0);
    const [days, setdays] = useState([]);
    const [wind, setwind] = useState(0);
    const [pressure, setpressure] = useState(0);
    const [humidity, sethumidity] = useState(0);
    const [lati, setLati] = useState(23);
    const [long, setLong] = useState(72);

    // API- it just means an interface, or method/way, for two pieces of software to communicate, share data manipulate it and update it.
    // useEffect hook used for fetching the data and and upadating with every change, useEffect has different funtions like
    // Data fetching, setting up a subscription, and manually changing the DOM in React components.
    // async/await is a keyword depicting asynchronous function that calls agaiin and again is there is a change in any part.  
    // If any error is occured than flow is passed to the catch block where error is printed in the console.

    useEffect(() => {
        const fetchData = async () => {
          try {
            // seach useState variable is used to fetch the live data of the entered city
              const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=23aade298a0fb4997e3f8faba53d7d7c`;
              const url1 =`https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&units=metric&exclude=hourly,minutely&appid=23aade298a0fb4997e3f8faba53d7d7c`;
              const response=await fetch(url);
              const data=await response.json();
              const response1=await fetch(url1);
              const data1=await response1.json();
              setdays(data1.daily);
              settemp(data.main.temp);
              sethumidity(data.main.humidity);
              setwind(data.wind.speed);
              setpressure(data.main.pressure);
              setLati(data.coord.lat);
              setLong(data.coord.lon);
          } catch (error) {
              console.log("error", error);
          }
      };
        fetchData();
    }, [search, lati, long]);
    return (
        <div className="weather-container">
        {/* input field used to tale input from users about the city name and than fetch the live data from API */}
        <input className="form-control" type="search" placeholder="Location" aria-label="Search"  onChange={(event)=>setSearch(event.target.value)} />
        <p className="heading"><Greeting temp={temp} /><span className="heading">{temp}</span><span className="cel">
        <sup>o<sub>C</sub></sup></span><span className="property">
        Humidity: {humidity}<span></span><br /> Wind: {wind} KMPH<br /> Pressure: {pressure}</span>
        </p>
        <center>
        <div className="graph-container">
        <Line
          data={gr}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:2
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
      </center>
        <div className="weather-row">
          <div className="weather-grid">
          {/* map function used to work with every index values present in an object array. */}
          {days.map((userinfo) => {
            return(
              <div>
                <WeatherCard temp={userinfo.temp.day} max={userinfo.temp.max} min={userinfo.temp.min} weath={userinfo.weather[0].main} humidity={userinfo.humidity} wind={userinfo.wind_speed} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

//exported as Weather
export default Weather;  
