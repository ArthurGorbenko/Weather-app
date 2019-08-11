import { Component } from "../../framework";
import AppState from "../../Services/AppState";

export default class SwitchUnits extends Component {
  constructor(host, props) {
    super(host, props);
    this.host.addEventListener("click", this.onClick);
    AppState.watch("UNITS", this.updateMySelf);
  }
  init() {
    this.updateMySelf = this.updateMySelf.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  updateMySelf(subState) {
    this.host.textContent === "C" ? subState = {units : "F"} :subState = {units : "C"}; 
    this.updateState(subState);
  }
  onClick() {
    if(this.textContent === "C") {
      AppState.update("UNITS",{units : "C"})
    } else {
      AppState.update("UNITS",{units : "F"})
    }
  }
  render() {
      return [
      this.state === undefined ? 
      this.props.units : 
      this.state.units
    ];
  }
}
