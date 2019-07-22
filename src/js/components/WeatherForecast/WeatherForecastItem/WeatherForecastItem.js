import { Component } from "../../../framework";

export default class WeatherForecastItem extends Component {
    constructor(host,props) {
        super(host,props);
    }
    
    render () {
        return 'I am WeatherForecastItem';
    }
}