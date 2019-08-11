import { Component } from "../../framework";
import AppState from "../../Services/AppState";

export default class CurrentTemperature extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch("UNITS", this.updateMySelf);
    AppState.watch("CURRENT_WEATHER",this.updateMySelf)
  }

  init() {
    this.state = this.props;
    this.updateMySelf = this.updateMySelf.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateMySelf(subState) {

    console.log(subState);
    if(subState.hasOwnProperty("temp")){
      subState = {
      temperature : subState.main.temp
      }
    
    } else {
      if(subState.units === "F") {
      this.state.temperature = Math.round(this.state.temperature * (9/5) + 32);
      } else {
      this.state.temperature = Math.round((this.state.temperature - 32) * (5/9))
    }
  }
    this.updateState(subState);
  }

  render() {
    return [
      `${this.state.temperature || this.props.temperature}${this.state.units ||
        this.props.units}`,
    ];
  }
}
