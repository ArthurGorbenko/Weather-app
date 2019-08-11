import { Component } from "../../../framework";
import WeatherConditions from "../../../Services/WeatherConditions";
import AppState from "../../../Services/AppState";

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch("UNITS",this.updateMySelf);
  }

  init() {
    this.updateMySelf = this.updateMySelf.bind(this);
  }

  updateMySelf (subState) {
    console.log(subState);
    if(subState.units === "F") {
      this.props.temp = Math.round(this.props.temp * (9/5) + 32);
      } else {
      this.props.temp = Math.round((this.props.temp - 32) * (5/9))
    }
    this.updateState(subState);
  }

  render() {
    return [
      {
        tag: "h5",
        classList: "main-info__week_day-card_title",
        content: `${this.props.day||"__"}`
      },
      {
        tag: "img",
        classList: "main-info__week_day-card_image",
        src: WeatherConditions.returnImage(this.props.weather)
      },
      {
        tag: "span",
        classList: "main-info__week_day-card_monday-deg",
        content: `${this.props.temp||"__"}${this.state === undefined ? "&deg;C" : this.state.units}`
      }
    ];
  }
}
