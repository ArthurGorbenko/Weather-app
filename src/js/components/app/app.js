import { CurrentWeather } from "../CurrentWeather";
import { Component } from "../../framework";
import { SearchBar } from "../SearchBar";
import { SearchHistory } from "../SearchBar/SearchHistory";
import { WeatherForecast } from "../WeatherForecast";
import { WeatherForecastItem } from "../WeatherForecast/WeatherForecastItem";

export default class App extends Component {
  constructor(host, props) {
    super(host, props);
  }
  render() {
    return [
      {
        tag : "main",
        classList : "app",
      },
      {
        tag: SearchBar,
        props: {
          query: SearchBar.props.query
        },
        childrens : [
          {
            tag : SearchHistory,
          }
        ]
      },
      {
        tag: CurrentWeather,
        props: {
          temperature: CurrentWeather.props.temperature,
          wind: CurrentWeather.props.wind,
          pressure: CurrentWeather.props.pressure,
          humidity: CurrentWeather.props.humidity,
          visibility: CurrentWeather.props.visibility
        },
        childrens: [
          {
            tag: "button",
            content: "Add to fav",
            classList: "main-info__today_add-to-fav"
          },
          {
            tag: "button",
            content: "",
            classList: "button_switch-mesurments"
          }
        ]
      },
      {
        tag: WeatherForecast,
        props: {},
        childrens: [
          {
            tag: WeatherForecastItem
          }
        ]
      }
    ];
  }
}
