import { Component } from "../../framework";
import imageUrlWind from "../../../images/wind.png";
import imageUrlPressure from "../../../images/pressure.png";
import imageUrlHumidity from "../../../images/humidity.png";
import imageUrlVisibility from "../../../images/visibility.png";
import imageUrlFavorite from "../../../images/favorite.png"
import AppState from "../../Services/AppState";
import WeatherDataService from "../../Services/WeatherDataService";
import WeatherConditions from "../../Services/WeatherConditions";
import { CurrentTemperature } from '../CurrentTemperature'
import { SwitchUnits } from "../SwitchUnits";

export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch("CURRENT_FORECAST", this.updateMySelf);
  }

  init() {
    this.state = this.props;
    this.makeFavorite = this.makeFavorite.bind(this);
    this.updateMySelf = this.updateMySelf.bind(this);
    let promiseCurrentWeather = WeatherDataService.getCurrentWeather();
    promiseCurrentWeather.then(data => {
      this.updateMySelf(data);
    });
  }

  updateMySelf(subState) {
    subState = {
      name: subState.name,
      country : subState.sys.country,
      temperature: subState.main.temp,
      icon: WeatherConditions.returnImage(subState.weather[0].icon),
      wind: subState.wind.speed,
      pressure: subState.main.pressure,
      humidity: subState.main.humidity,
      visibility: subState.visibility
    };
    ["temperature", "wind", "pressure", "visibility", "humidity"].forEach(
      iterableCondition => {
        subState[iterableCondition] = Math.floor(subState[iterableCondition]);
      }
    );
    this.updateState(subState);
  }

  makeFavorite() {
    AppState.update("FAVORITES", { name: this.state.name, country: this.state.country });
  }

  render() {
    return [
      {
        tag: "div",
        classList: "wrapper_main-info__today_header",
        childrens: [
          {
            tag: "h3",
            content: `${this.state.name||"_"},${this.state.country||"_"}`,
            classList: "main-info__today_header"
          },
          {
            tag: "button",
            classList : "main-info__today_add-to-fav",
            childrens : [
              {
                tag:"img",
                src : imageUrlFavorite,
                classList : "main-info__today_add-to-fav",

              }
            ],
            eventHandlers: {
              "click": this.makeFavorite
            }
          }
        ]
      },
      {
        tag: "div",
        classList: "wrapper_main-info__today",
        childrens: [
          {
            tag: "img",
            classList: "main-info__today_image",
            src: this.state.icon
          },
          {
            tag: CurrentTemperature,
            tagName : "h2",
            classList: "main-info__today_current-temperature",
            props : {
              temperature : this.state.temperature||"",
              units : "C",
            }
          },
          {
            tag: "div",
            classList: "wrapper_main-info__today_mesurements",
            childrens: [
              // {
              //   tag: "img",
              //   classList: "main-info__today_mesurements",
              //   src: imageUrlUnit
              // },
              {
                tag: SwitchUnits,
                tagName : "button",
                classList: "button_switch-mesurments",
                props : {
                  units : "F"
                }
              }
            ]
          }
        ]
      },
      {
        tag: "div",
        classList: "wrapper_main-info__today_additional",
        childrens: [
          {
            tag: "div",
            classList: ["wrapper_main-info__today_option", "option_wind"],
            childrens: [
              {
                tag: "img",
                classList: "option_icon",
                src: imageUrlWind
              },
              {
                tag: "span",
                classList: "option_text",
                content: `${this.state.wind || ""}m/s`
              }
            ]
          },
          {
            tag: "div",
            classList: ["wrapper_main-info__today_option", "option_pressure"],
            childrens: [
              {
                tag: "img",
                classList: "option_icon",
                src: imageUrlPressure
              },
              {
                tag: "span",
                classList: "option_text",
                content: `${this.state.pressure || ""} hPa`
              }
            ]
          },
          {
            tag: "div",
            classList: ["wrapper_main-info__today_option", "option_humidity"],
            childrens: [
              {
                tag: "img",
                classList: "option_icon",
                src: imageUrlHumidity
              },
              {
                tag: "span",
                classList: "option_text",
                content: `${this.state.humidity || ""}%`
              }
            ]
          },
          {
            tag: "div",
            classList: ["wrapper_main-info__today_option", "option_visibility"],
            childrens: [
              {
                tag: "img",
                classList: "option_icon",
                src: imageUrlVisibility
              },
              {
                tag: "span",
                classList: "option_text",
                content: `${this.state.visibility || ""}m`
              }
            ]
          }
        ]
      }
    ];
  }
}
