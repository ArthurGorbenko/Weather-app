import thunder from '../../images/thunder.svg';
import drizzle from '../../images/drizzle.svg';
import rain from '../../images/rain.svg';
import snow from '../../images/snow.png';
import tornado from '../../images/tornado.svg';
import clearsky from '../../images/clearsky.svg';
import clouds from '../../images/clouds.svg';

const weatherConditions = {
    "11d" : thunder,
    "09d" : drizzle,
    "10d" : rain,
    "10n" : rain,
    "13d" : rain,
    "13d" : snow,
    "50d" : tornado,
    "01d" : clearsky,
    "01n" : clearsky,
    "02d" : clouds,
    "03d" : clouds,
    "04d" : clouds,
    "02n" : clouds,
    "03n" : clouds,
    "04n" : clouds,  
  }
  
class WeatherConditionsService {
    returnImage (id) {
        for (let prop in weatherConditions) {
            if(prop === id) {
                return weatherConditions[prop];
            }
        }
    };
}

export default new WeatherConditionsService();