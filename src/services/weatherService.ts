import { DateTime } from "luxon";
import { FormattedCurrentForcastWeather, FormattedWeather, SearchParams, WeatherData, WeatherRes, WeatherUnit } from "./types";

const API_KEY = "1fa9ff4126d95b8db54f3897a208e91c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric
//infoType=weather


const getWeatherData = (infoType:string, searchParams:SearchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => {return res.json()});
};

const formatCurrentWeather = (data:WeatherData) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  } as FormattedWeather;
};

const formatForecastWeather = (data:WeatherRes) => {
  let { timezone, daily, hourly } = data;
   daily  = daily.slice(1, 6).map((d:WeatherUnit) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  }) ;

   hourly= hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });
  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams:SearchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather) as FormattedWeather;
  const { lat, lon } = formattedCurrentWeather ;
  const param={lat,lon,excluds:"current,minutely,alerts",units:searchParams.units}
  const formattedForecastWeather = await getWeatherData("onecall",param).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather } as FormattedCurrentForcastWeather;
};

const formatToLocalTime = (
  secs: number,
  zone: string,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code: string) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
