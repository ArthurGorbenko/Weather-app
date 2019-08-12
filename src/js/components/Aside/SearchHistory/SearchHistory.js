import { Component } from "../../../framework";
import AppState from "../../../Services/AppState";
import WeatherDataService from '../../../Services/WeatherDataService'

export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch("HISTORY_UPDATE",this.updateMySelf);
  }

  init () {
    this.updateMySelf = this.updateMySelf.bind(this);
    this.data = [];
  }

  updateMySelf(subState) {
    if(this.data.some(element => {
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
    this.data.push(subState);
    this._render();
  }

  render() {
    return [
      {
        tag: "section",
        classList: [
          "aside__block",
          "aside__block_history",
          "custom_background_components"
        ],
        childrens: [
          {
            tag: "h4",
            content: "History",
            classList: "aside__block__titles"
          },
          {
            tag: "ul",
            classList: "aside__block_history__list",
            childrens: this.data.length === 0 ? [{tag:"li",classList : "aside__lists__labels",content:"You did not search for any cities yet..."}] : [...this.data]
          }
        ]
      }
    ];
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