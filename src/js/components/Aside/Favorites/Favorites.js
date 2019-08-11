import { Component } from "../../../framework";
import AppState from "../../../Services/AppState";

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
    subState = {
      tag : "li",
      classList : "aside__block_favorites__list_element",
      content : `${subState.name},${subState.country}`,
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
