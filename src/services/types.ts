export type SearchParams = {
    q?: string,
    units: string,
    excluds?: string,
    lat?: number,
    lon?: number
}
export type Weather = {
    id: number, main: string, description: string, icon: string
}

export type WeatherData = {
    base: string,
    clouds: { all: number }
    cod: number
    coord: { lon: number, lat: number }
    dt: number
    id: number
    main: { temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, humidity: number }
    name: string
    sys: { type: number, id: number, country: string, sunrise: number, sunset: number }
    timezone: number
    visibility: number
    weather: Weather[]
    wind: { speed: number, deg: number, gust: number }
}

export type WeatherUnit = {
    clouds: number
    dew_point: number
    dt: number
    feels_like: { day: number, night: number, eve: number, morn: number }
    humidity: number
    moon_phase: number
    moonrise: number
    moonset: number
    pop: number
    pressure: number
    sunrise: number
    sunset: number
    temp: { day: number, eve: number, max: number, min: number, morn: number, night: number },
    uvi: number,
    weather: Weather[]
    wind_deg: number,
    wind_gust: number
    wind_speed: number
}

export type WeatherRes = {
    daily: WeatherUnit[]
    hourly: WeatherUnit[]
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
}

export type Oweather = {
    title: string,
    temp: number,
    icon: string,
}

export type FormattedWeather = {
    lat: number,
    lon: number,
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    humidity: number,
    name: string,
    dt: number,
    country: string,
    sunrise: number,
    sunset: number,
    details: string,
    icon: string,
    speed: number,
}

export type FormattedForecastWeather = {
    timezone: string,
    daily: WeatherUnit[],
    hourly: WeatherUnit[],
}

export type dayWeather = {
    icon: string
    temp: number
    title: string
}
export type FormattedCurrentForcastWeather = FormattedWeather & FormattedForecastWeather;