const URL_CURRENT_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?q=";
const FORECAST = "https://api.openweathermap.org/data/2.5/forecast?q="
const APPID ="&APPID=a05ca3e3c944d4d0408057f1181d59ed";

class WeatherDataService {

   async getCurrentWeather(city="Kiev",units="metric") {
     let answerServer,response;
     try {
     answerServer = await fetch (URL_CURRENT_WEATHER + `${city}&units=${units}` + APPID);
     response = await answerServer.json();
    
     } catch {
       console.log("Error");
     }
     return response;
  }

  async getWeatherForecast(city="Kiev",units="metric") {
    let answerServer,response;
    try{
     answerServer = await fetch (FORECAST + `${city}&units=${units}` + APPID);
     response = await answerServer.json();
    } catch {
      console.log("Error");
    }
    return response;
  }
}

export default new WeatherDataService();