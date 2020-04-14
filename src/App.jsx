import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
            weather: [
                        {day:'Monday',temperatur:25, min:23, max:27, wind:'12kmph',type:'sunny',humidity:'59%'},
                        {day:'Tuesday',temperatur:25, min:23, max:27, wind:'12kmph',type:'snowy',humidity:'59%'},
                        {day:'Wednesday',temperatur:25, min:23, max:27, wind:'12kmph',type:'rainy',humidity:'59%'},
                        {day:'Thursday',temperatur:25, min:23, max:27, wind:'12kmph',type:'sunny',humidity:'59%'},
                        {day:'Friday',temperatur:25, min:23, max:27, wind:'12kmph',type:'cloudy',humidity:'59%'},
                    ],
            weatherData : [],
            city: 'London',
            dispCity:'London',
            country: 'UK',
            resErr:false
          }
    this.changeTempScale = this.changeTempScale.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    componentDidMount(){
      var api_key = "0d9d68a0e32b49dd9b9e9bacc9eefc16";
      var url = "http://api.openweathermap.org/data/2.5/forecast?q=London,us&appid="+api_key;
      fetch(url).then(response => response.json()).then(
                             (result) => {
                              this.setState({
                                  weatherData:result
                              });
                              },
                      (error) => {
                        this.setState({
                          weatherData : []
                      });
              }
              )

        
    }

  render() {
    if(this.state.weatherData.length!=0){
      return (
        <div className="outerDiv">
          {this.createBlock()}
        </div>
      );
    }
      //alert(this.state.weatherData.list[0].main.temp);
    else{
      return(
        <div></div>
      );
    }
  }

  handleCityChange(event) {
    this.setState({city: event.target.value});
    this.setState({dispCity: event.target.value});
  }

  handleCountryChange(event){
    this.setState({country: event.target.value});
  }

  getLoctionWeather = () =>  {
    var api_key = "0d9d68a0e32b49dd9b9e9bacc9eefc16";

    var city = (this.state.city);
    var country = (this.state.country);
      var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +","+ country + "&appid="+api_key;
      fetch(url).then(response => response.json()).then(
                             (result) => {
                              if(result.cod === "404"){
                                this.setState({resErr:true});
                              }
                              else{
                                this.setState({
                                  weatherData:result,
                                  resErr:false
                              });
                              }
                              },
                      (error) => {
                        alert('error');
                        this.setState({
                          weatherData : []
                      });
              }
              )
  }

  createDropDown = () => {
    return(
      <div className="locationField">
      <input id="city" type="text" placeholder="City" value={this.state.city} onChange={this.handleCityChange}></input>
      <input id="country" type="text" placeholder="Country" value={this.state.country} onChange={this.handleCountryChange}></input>
      <button onClick={this.getLoctionWeather}>Get Weather</button>
      {(this.state.resErr===true) ? 
        <div className="error">City not found</div> :
        ""
      }
      </div>
    );
  }

  createBlock = () => {
      let currentDayWeatherType = this.state.weatherData.list[0].weather[0].main + ".png";
      let dateStr = this.state.weatherData.list[0].dt_txt.split(' ')[0];
      var weekDay = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var weatherDay = weekDay[(new Date(dateStr)).getDay()];
      var dateDisplay = months[new Date(dateStr).getMonth()] + " " + (new Date(dateStr).getDate()+1) + ", " + (new Date(dateStr).getFullYear());
      var weatherTemp = this.convertTemperature(this.state.weatherData.list[0].main.temp).toFixed(0) + String.fromCharCode(176) + 'C';
      var weatherWind = this.convertSpeed(this.state.weatherData.list[0].wind.speed).toFixed(0) + 'km/h';
      return(
        <div className="mainDiv">
        <div className="mainDivContent">
          <h1 className="applicationHeading">Weather Forecast</h1>
          <div>
            <h1 className="mainDivElemHead">{this.state.dispCity.toUpperCase() + " , " + this.state.country.toUpperCase()}</h1>
                        {this.createDropDown()}
          </div>
          <br/><br/><br/>
          <div>
          <h1 className="mainDivElemHead1">  {weatherDay} {dateDisplay}</h1>
          </div>
          <br/><br/>
          <div className="mainDivCon">
          <div className="inLine"><h1>{weatherTemp}</h1></div>
          <div className="leftSide">
          <div className="leftSideBlock"><h2>Humidity: {this.state.weatherData.list[0].main.humidity}%</h2></div>
          <div className="leftSideBlock"><h2>Wind: {weatherWind}</h2></div>
          </div>
          </div>
        </div>
        
        {this.createWeatherBlocks()}
      </div>
      );
  }

  createWeatherBlocks = () => {
    var dayBlocks = [];
    for(var i=0;i<this.state.weatherData.list.length;i++){
      let datecur = this.state.weatherData.list[i].dt_txt.split(' ')[0];
      if(i!==0){
        let dateold = this.state.weatherData.list[i-1].dt_txt.split(' ')[0];
        if(datecur === dateold){
          continue;
        }
      }

      var dateStr = this.state.weatherData.list[i].dt_txt.split(' ')[0];
      var currentCity = this.state.weatherData.city.name;
      var weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      var weatherDay = weekDay[(new Date(dateStr))+1];
      var currentDayWeather = (this.state.weatherData.list.filter(daywiseData => daywiseData.dt_txt.includes(dateStr)));
      dayBlocks.push(
        <Link to={{ pathname: '/daywise', state: { city : currentCity , dayWiseData: currentDayWeather} }}>
        <div className="dayBlocks">
          {this.createWeatherElements(i)}
        </div>
        </Link>
      );
    }
    return dayBlocks;
  }

  createWeatherElements = (i) => {
    var weatherType = this.state.weatherData.list[i].weather[0].main;
    var imgPath =   weatherType +'.png';
    imgPath = "http://openweathermap.org/img/wn/"+ this.state.weatherData.list[i].weather[0].icon+ "@2x.png";
    //alert(imgPath);
    var minTemp = this.convertTemperature(this.state.weatherData.list[i].main.temp_min).toFixed(0) + String.fromCharCode(176);
    var maxTemp = this.convertTemperature(this.state.weatherData.list[i].main.temp_max).toFixed(0) + String.fromCharCode(176);
    var dateStr = this.state.weatherData.list[i].dt_txt.split(' ')[0];
    var weekDay = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //alert(new Date(dateStr).getDay());
    var weatherDay = weekDay[(new Date(dateStr)).getDay()];
    var dateDisplay = months[new Date(dateStr).getMonth()] + " " + (new Date(dateStr).getDate()+1) + ", " + (new Date(dateStr).getFullYear());
    var weatherHumidity = this.state.weatherData.list[i].main.humidity + String.fromCharCode(37);
    var weatherWind = this.convertSpeed(this.state.weatherData.list[i].wind.speed).toFixed(0) + ' km/h';  
    
    return(
        <div className="weatherElements">
          <div>
            <div className="weatherDay">{weatherDay}</div>
            <div className="tempElem1">Min {minTemp}</div>
            <div className="tempElem1">Max {maxTemp}</div>
            <div>
              <img className="weatherImages" src={imgPath} alt="weatherSunny"></img>
            </div>

            <div>
            <div>
                <div className="humidity1"><img className="humidIcon" src="Humidity.png" height="20px" width="20px"/> {weatherHumidity}</div>
                
            </div>
        </div>
        <div>
        <div>
            <div className="humidity1"><img className="humidIcon" src="wind.png" height="18px" width="18px"/> {weatherWind}</div>
            
        </div>
    </div>

        </div>
        
          <div className="wetherElementDay">
            {dateDisplay}
          </div>
        </div>
      );
  }

  convertSpeed(value){ 
    var speed = (value*18)/5;
    return speed;
  }

  convertTemperature(value){
    var celcius = (value - 273.15);
    return celcius;
  }

  changeTempScale(event) {
    var a = event.target.id;
    alert("hello");
    alert(event.target.value);
  }
  populateMainDiv = () => {

  }
  
}

export default App;
