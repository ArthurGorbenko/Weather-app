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
        tag: Aside,
        tagName: "aside",
        classList: "aside"
      },
      {
        tag: "div",
        classList: "wrapper__main-info",
        childrens: [
          {
            tag: SearchBar,
            tagName: "div",
            classList: "wrapper__main-info_search-field"
          },
          {
            tag: CurrentWeather,
            tagName: "section",
            classList: ["main-info__today", "custom_background_components"],
          },
            {
            tag: WeatherForecast,
            tagName: "section",
            classList: ["main-info__week", "custom_background_components"]
          }
        ]
      }
    ];
  }
}
