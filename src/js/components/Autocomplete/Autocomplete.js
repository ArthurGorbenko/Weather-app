import { Component } from "../../framework";
import AppState from "../../Services/AppState";
import WeatherDataService from "../../Services/WeatherDataService";

export default class Autocomplete extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch("AUTOCOMPLETE_CITIES", this.updateMySelf);
  }

  init() {
    this.updateMySelf = this.updateMySelf.bind(this);
  }

  updateMySelf(subState) {
    if (subState.length !== 0) {
      this.host.classList.remove("visually-hidden");
    } else {
      this.state = undefined;
      this.host.classList.add("visually-hidden");
    }
    subState = subState.map(element => {
      return {
        tag: "li",
        classList: "autocomlpete-list__element",
        content: element,
        eventHandlers: {
          click: this.onChooice,
        },
      };
    });
    this.updateState(subState);
  }

  onChooice() {
    AppState.update("AUTOCOMPLETE_CITIES", []);
    WeatherDataService.getCurrentWeather(this.innerHTML).then(data => {
      AppState.update("CURRENT_FORECAST", data);
      AppState.update("HISTORY_UPDATE", {
        name: data.name,
        country: data.sys.country,
      });
    });
    WeatherDataService.getWeatherForecast(this.innerHTML).then(data => {
      AppState.update("FORECAST_FIVE_DAYS", data);
    });
  }

  render() {
    let arr = [];
    if (this.state !== undefined) {
      for (let prop in this.state) arr.push(this.state[prop]);
    }
    return [...(arr || null)];
  }
}
