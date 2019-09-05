import { Component } from "../../framework";
import WeatherForecastItem from "./WeatherForecastItem/WeatherForecastItem";
import WeatherDataService from "../../Services/WeatherDataService";
import AppState from "../../Services/AppState";

const indexToDay = [
  "sun","mon","tue","wed","thu","fri","sat"
]

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch("FORECAST_FIVE_DAYS",this.updateMySelf);
  }

  init(city = "Kiev", units = "metric") {
    this.updateMySelf = this.updateMySelf.bind(this);
    let serverAnswer = WeatherDataService.getWeatherForecast();
    serverAnswer.then(data => {
      this.updateMySelf(data);
    });
  }

  updateMySelf(subState) {
    subState = subState.list
      .filter(forecast => {
        if (new Date(forecast.dt_txt).getHours() === 15) {
          return true;
        } else return false;
      })
      .map(dayForecast => {
        return {
          day : indexToDay[new Date(dayForecast.dt_txt).getDay()],
          weather : dayForecast.weather[0].icon,
          temp : Math.floor(dayForecast.main.temp),
        }        
      });
    this.updateState(subState);
  }

  render() {
    let fiveDayForecast = [];
    for (let day in this.state) {
      fiveDayForecast.push({
        tag : WeatherForecastItem,
        tagName : "li",
        classList: "main-info__week_day-card",
        props : this.state[day],
      })
    }
    return [
      {
        tag: "ul",
        classList: "main-info__week_list",
        childrens : fiveDayForecast,
      }
    ];
  }
}
