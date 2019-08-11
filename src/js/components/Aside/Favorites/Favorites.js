import { Component } from "../../../framework";
import AppState from "../../../Services/AppState";
import WeatherDataService from '../../../Services/WeatherDataService'

export default class Favorites extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch("FAVORITES",this.updateMyself);
  }

  init () {
    this.updateMyself = this.updateMyself.bind(this);
    this.favoriteCities = [];
  }

  updateMyself(subState) {
    console.log(subState);
    if(this.favoriteCities.some(element => {
      return `${subState.name},${subState.country}` === element.content
    })){
      return ;
    };
    subState = {
      tag : "li",
      classList : "aside__block_favorites__list_element",
      content : `${subState.name},${subState.country}`,
      eventHandlers : {
        "click" : onClick
      }
    }
    this.favoriteCities.push(subState);
    this._render();
  }

  render() {
    return [
          {
            tag: "h4",
            content: "Favorites",
            classList: "aside__block__titles"
          },
          {
            tag: "ul",
            classList: "aside__block_favorites__list",
            childrens: [...this.favoriteCities]||null
          }
        ]
      }
  }

  function onClick () {
    WeatherDataService.getCurrentWeather(this.innerHTML).then(data => {
      AppState.update("CURRENT_FORECAST", data);
    });
    WeatherDataService.getWeatherForecast(this.innerHTML).then(data => {
      AppState.update("FORECAST_FIVE_DAYS", data);
    });
  }