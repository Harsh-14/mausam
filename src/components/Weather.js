import React, { useContext, useEffect, useState } from "react";
import { Ripple } from "react-css-spinners/dist/Ripple";
import { GlobalStoreContext } from "./Store";
import axios from "axios";
import DailyWeather from "./DailyWeather";
import WeatherByTheHour from "./WeatherByTheHour ";
import WeatherNow from "./WeatherNow ";
import Divider from "@mui/material/Divider";

const Weather = () => {
  const [globalStore, setGlobalStore] = useContext(GlobalStoreContext);
  const [weatherLoaded, setWeatherLoaded] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, [globalStore.latitude]);

  const fetchWeather = async () => {
    setWeatherLoaded(false);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${globalStore.latitude}&lon=${globalStore.longitude}&exclude=minutely&appid=f3b1b68e91f7bf84300969939d5126d2`
      );
      setGlobalStore({ ...globalStore, JSON: res.data, isAppLoaded: true });
      console.log(res.data);
    } catch (err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      setGlobalStore({ ...globalStore, error: err });
    } finally {
      setWeatherLoaded(true);
    }
  };

  const handleTemperatureUnitChange = (event) => {
    event.preventDefault();
    setGlobalStore({ ...globalStore, tInC: !globalStore.tInC });
  };

  return weatherLoaded ? (
    <div>
      <Divider />
      <WeatherByTheHour />
      <Divider />
      <div className="renderedWeather">
        <button className="cOrF" onClick={handleTemperatureUnitChange}>
          Switch to &deg;{globalStore.tInC ? "F" : "C"}
        </button>
        <div className="leftPanel">
          <div className="cityName">{globalStore.address}</div>
          <WeatherNow />
        </div>
        <div className="rightPanel">
          <DailyWeather />
        </div>
      </div>
    </div>
  ) : (
    <div className="loadingDiv">
      <Ripple size={154} />
    </div>
  );
};

export default Weather;
