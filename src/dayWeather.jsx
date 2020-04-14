import React from 'react'
class DayWeather extends React.Component {

constructor(props){
    super(props);
    let apiData =
    [{"dt":1553709600,"main":{"temp":272.09,"temp_min":271.358,"temp_max":272.09,"pressure":1018.01,"sea_level":1018.01,"grnd_level":997.153,"humidity":100,"temp_kf":0.73},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":60},"wind":{"speed":3.25,"deg":287.822},"sys":{"pod":"n"},"dt_txt":"2019-03-27 18:00:00"},
    {"dt":1553713200,"main":{"temp":271.59,"temp_min":271.1,"temp_max":271.59,"pressure":1018.335,"sea_level":1018.335,"grnd_level":997.403,"humidity":100,"temp_kf":0.49},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":2},"wind":{"speed":3.4,"deg":294.075},"sys":{"pod":"n"},"dt_txt":"2019-03-27 19:00:00"},
    {"dt":1553716800,"main":{"temp":271.15,"temp_min":270.907,"temp_max":271.15,"pressure":1018.794,"sea_level":1018.794,"grnd_level":997.864,"humidity":100,"temp_kf":0.24},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":1},"wind":{"speed":3.47,"deg":300.189},"sys":{"pod":"n"},"dt_txt":"2019-03-27 20:00:00"},
    {"dt":1553720400,"main":{"temp":270.722,"temp_min":270.722,"temp_max":270.722,"pressure":1019.211,"sea_level":1019.211,"grnd_level":998.29,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":1},"wind":{"speed":3.55,"deg":305.558},"sys":{"pod":"n"},"dt_txt":"2019-03-27 21:00:00"},
    {"dt":1553724000,"main":{"temp":270.63,"temp_min":270.63,"temp_max":270.63,"pressure":1019.58,"sea_level":1019.58,"grnd_level":998.674,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":1},"wind":{"speed":3.59,"deg":309.126},"sys":{"pod":"n"},"dt_txt":"2019-03-27 22:00:00"},
    {"dt":1553727600,"main":{"temp":270.421,"temp_min":270.421,"temp_max":270.421,"pressure":1019.849,"sea_level":1019.849,"grnd_level":998.886,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":3.67,"deg":307.204},"sys":{"pod":"n"},"dt_txt":"2019-03-27 23:00:00"},
    {"dt":1553731200,"main":{"temp":270.201,"temp_min":270.201,"temp_max":270.201,"pressure":1020.021,"sea_level":1020.021,"grnd_level":998.983,"humidity":100,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":7},"wind":{"speed":3.94,"deg":304.735},"sys":{"pod":"n"},"dt_txt":"2019-03-28 00:00:00"},
    {"dt":1553734800,"main":{"temp":269.942,"temp_min":269.942,"temp_max":269.942,"pressure":1020.24,"sea_level":1020.24,"grnd_level":999.091,"humidity":100,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":66},"wind":{"speed":4.24,"deg":306.38},"sys":{"pod":"n"},"dt_txt":"2019-03-28 01:00:00"},{"dt":1553738400,"main":{"temp":269.768,"temp_min":269.768,"temp_max":269.768,"pressure":1020.634,"sea_level":1020.634,"grnd_level":999.451,"humidity":100,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":67},"wind":{"speed":4.63,"deg":313.941},"sys":{"pod":"n"},"dt_txt":"2019-03-28 02:00:00"}];
    
    this.state = {weatherData : props.location.state.dayWiseData,
                  data : apiData ,
                  city : props.location.state.city
    };
}
  render() {
    var selectedDate = new Date(this.state.weatherData[0].dt_txt.split(' ')[0]);
    var weekDay = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return(
        <div className="mainDiv">
            <div>
    <div className="displayData">{this.state.city}</div>

                <div className="displayData">Hourly Weather Forecast on {weekDay[(selectedDate.getDay())] + " " + months[(selectedDate.getMonth())] +" "+(selectedDate.getDate() + 1) + ", " + (selectedDate.getFullYear())}</div>
            </div>
            <div className="weatherElemContainer">
            {this.createBlock()}
            </div>
        </div>
    );
  }

  createBlock = () => {
      let weatherBlocks = [];
      for(let i=0;i<this.state.weatherData.length;i++){
        weatherBlocks.push(
            <div className="HourlyWeatherElem">
                {this.createWeatherElements(i)}
            </div>
        );
        //alert(imgPath);
        
      }
      return weatherBlocks;
  }

  createWeatherElements = (i) => {
    let weatherElementsBlock = [];
    //let imgPath = this.state.weatherData[i].weather[0].main + '.png';
    let imgPath = "http://openweathermap.org/img/wn/"+ this.state.weatherData[i].weather[0].icon+ "@2x.png";
    let weatherDesc = this.state.weatherData[i].weather[0].description;
    let temp = this.convertTemperature(this.state.weatherData[i].main.temp).toFixed(0)+String.fromCharCode(176);
    let weatherTime = this.state.weatherData[i].dt_txt;
    let weatherHumidity = this.state.weatherData[i].main.humidity;
    let weatherWind = this.convertSpeed(this.state.weatherData[i].wind.speed).toFixed(0);
    weatherElementsBlock.push(
        <div className="weatherElementsHourly">
            <div>
            <div>
                <img className="weatherImagesHourly" src={imgPath} alt="Weather Image"/>
                <div className="weatherTemp">
                {temp}
            </div>
            </div>
            <div className="weatherDesc">
                {weatherDesc}
            </div>
            <div>
                <div>
                    <div className="humidity"><img className="humidIcon" src="Humidity.png" height="20px" width="20px"/></div>
                    <div className="humidity valueSpan">{weatherHumidity}</div>
                </div>
            </div>
            <div>
            <div>
                <div className="humidity"><img className="humidIcon" src="wind.png" height="18px" width="18px"/></div>
                <div className="humidity valueSpan">{weatherWind}kmph</div>
            </div>
        </div>
        </div>

            <div className="wetherElementTime">
            {this.convertTime(weatherTime.split(' ')[1].split(':')[0])}
            </div>
        </div>
    );
    return weatherElementsBlock;
  }

  convertSpeed(value){ 
    var speed = (value*18)/5;
    return speed;
  }

  convertTemperature(value){
    var celcius = (value - 273.15);
    return celcius;
  }

  convertTime(value){
    var AmOrPm = value >= 12 ? 'pm' : 'am';
    var hours = (value % 12) || 12;
    var finalTime = hours + " " + AmOrPm; 
    return finalTime; 
  }

}
export default DayWeather