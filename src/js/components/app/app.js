import { Component } from "../../framework";
import { Aside } from "../Aside";
import { SearchBar } from "../SearchBar";
import { CurrentWeather } from "../CurrentWeather";
import { WeatherForecast } from "../WeatherForecast";

export default class App extends Component {
  constructor(host, props) {
    super(host, props);
  }
  render() {
    return [
      {
        tag : "main",
        classList : "app",
        childrens : [
          {
            tag : Aside
          },
          {
            tag : SearchBar,
          },
          {
            tag : CurrentWeather,
          },
          {
            tag : WeatherForecast,
          },
        ],
      }
    ];
  }
}
