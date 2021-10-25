import React from "react";
import styled from "styled-components";
import ReactAnimatedWeather from 'react-animated-weather';
import "./weathers.css";

// One mmore way of using css styling in the same file by declaring as a different component.
const Wrapper = styled.div`
  width: 100px;
  .cloud-img {
    height: 2rem;
  }

  .weather-card {
    &__day {
      color: #5b72a9;
    }

    &__tempt {
      display: block;
      font-size: 1rem;
      color: #6790de;
    }

    &__weather {
      display: block;
      font-size: 0.5rem;
      color: #677db1;
    }

    &__max-tempt {
      color: white;
      margin-right: 0.25rem;
    }

    &__min-tempt {
      color: white;
    }
  }
`;

// Function created to change the weather animation according to the temperature stats present at that time using if else 
// and returning the animation using proper parameters.
const defaults = {
    icon: 'Clear',
    color: 'goldenrod',
    size: 40,
    animate: true
  };
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

// WeatherCard function component created for using the specific styling as declared above and return a card with details suing the 
// properties that is recieved from the weather component.
const WeatherCard = (props) => {
  return (
    <Wrapper className="weather-card">
      <div className="weather-card__image">
      <Greeting temp={props.temp} />
      </div>
      <span className="weather-card__tempt">{props.temp}°</span>
      <span className="weather-card__weather"><h2>{props.weath}</h2></span>
      <span className="weather-card__weather"><h6>{props.max}°/{props.min}°</h6></span>
      <span className="weather-card__weather"><h6>Humidity: {props.humidity}</h6></span>
      <span className="weather-card__weather"><h6>Wind: {props.wind}</h6></span>
    </Wrapper>
  );
};

// exported as WeatehrCard.
export default WeatherCard;