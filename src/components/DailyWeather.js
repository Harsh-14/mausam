import React, { useContext } from "react";
import { GlobalStoreContext } from "./Store";
import { KtoC, KtoF, getDate, getIcon } from "../functions/functions";
import partly_cloudy_day from "../static/images/icons/partly-cloudy-day.svg";
export default function DailyWeather() {
  const [globalStore] = useContext(GlobalStoreContext);
  var imgg='';
  const DAYS_TO_DISPLAY = 3;

  const displayedWeather =
    globalStore.JSON.daily.slice(1, DAYS_TO_DISPLAY + 1) || [];

    function getIconURL(date) {
      const icon = getIcon(`${date.weather[0].icon}`);
      const ic=`../static/images/icons/${icon}.svg`;
      console.log(ic)
      return ic;
    }
  

  function getTemp(temp) {
    if (globalStore.tInC) {
      return KtoC(temp).toFixed(0);
    } else {
      return KtoF(temp).toFixed(0);
    }
  }

  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: globalStore.JSON.timezone,
  };

  return displayedWeather.map((day, i) => (
    <div className="dailyWeather" key={i}>
      <div>
        <div className="icon">
          <img src={partly_cloudy_day} alt="icon" />
        </div>
        <div className="date">{getDate(day.dt, dateOptions)}</div>
        <div>
          {getTemp(day.temp.min)}&deg; /&nbsp;
          {getTemp(day.temp.max)}&deg;
          {globalStore.tInC ? "C" : "F"}
        </div>
        <div className="forecastSummary">{day.weather[0].description}</div>
        <hr />
      </div>
    </div>
  ));
}
