import { Component } from "../../framework";
import imageUrl from "../../../images/search1.png";
import WeatherDataService from "../../Services/WeatherDataService";
import AppState from '../../Services/AppState';
import cities from "../../Assets/cities";
import { Autocomplete } from "../Autocomplete/index.js"

export default class SearchBar extends Component {
  constructor(host, props) {
    super(host, props);
      }

  onSearch() {
    if(this.value.length < 3) {
      AppState.update("AUTOCOMPLETE_CITIES",[])
      return;
    }
    const query = this.value;
    const result = cities.filter(cityName => cityName.startsWith(query));
    AppState.update("AUTOCOMPLETE_CITIES",result);   
    
  }

  render() {
        return [
      {
        tag: "input",
        classList: ["search__input", "custom_background_components"],
        eventHandlers : {
          'keyup':this.onSearch,
        },
        attributes: [
          {
            name: "type",
            value: "search"
          },
          {
            name: "value",
            value: "Search..."
          },
          {
            name : "onfocus",
            value : "this.value = \'\'",
          }
        ]
      },
      {
        tag: "button",
        classList: "search-field_button",
        childrens: [
          {
            tag: "img",
            classList: "search-field_icon",
            src: imageUrl,
            attributes: [
              {
                name: "alt",
                value: "search icon"
              }
            ]
          }
        ]
      },
      {
        tag : Autocomplete,
        tagName : "ul",
        classList : ["autocomplete-list","visually-hidden"],
      }
    ];
  }
}
