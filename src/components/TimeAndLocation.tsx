import { FormattedCurrentForcastWeather } from "../services/types";
import { formatToLocalTime } from "../services/weatherService";

type IProps={
  weather:FormattedCurrentForcastWeather
}

function TimeAndLocation({ weather: { dt, timezone, name, country } }:IProps) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
