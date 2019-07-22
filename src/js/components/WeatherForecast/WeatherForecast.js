import { Component } from "../../framework";

export default class WeatherForecast extends Component {
    constructor(host,props) {
        super(host,props);
    }
    
    render () {
        return 'I am WeatherForecast';
    }
}