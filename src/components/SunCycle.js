import React from 'react';
import { getTime } from '../functions/functions';
import sunsetimg from '../static/images/icons/sunset.svg'
import sunriseimg from '../static/images/icons/sunrise.svg'
import sunimg from '../static/images/icons/sun.svg'
export default function SunCycle(props) {
  const { sunrise, sunset, timezone } = props;

  const dayLength = sunset - sunrise;
  const timeNow = (new Date() / 1e3).toFixed(0);
  const dayProgress = sunset - timeNow;
  let sunPositionX = Math.cos((dayProgress / dayLength) * Math.PI) + 1;
  let sunPositionY = Math.sin((dayProgress / dayLength) * Math.PI);

  if (timeNow < sunrise) {
    sunPositionX = 0;
    sunPositionY = 0;
  } else if (timeNow > sunset) {
    sunPositionX = 2;
    sunPositionY = 0;
  } else if (sunrise === undefined && sunset === undefined) {
    sunPositionX = 1;
    sunPositionY = 1;
  }

  const timeOptions = {
    timeZone : timezone,
    hour     : '2-digit',
    minute   : '2-digit',
    hour12   : true
  };

  const sunRise = sunrise ? getTime(sunrise, timeOptions) : 'White night';
  const sunSet = sunset ? getTime(sunset, timeOptions) : 'White night';

  return (
    <div className="sunCycle">
      <span className="sunrise">
        <img src={sunriseimg} alt="Sunrise"/>
        <span className="sunriseTime">{sunRise}</span>
      </span>
      <span className="sunset">
        <img src={sunsetimg} alt="Sunset"/>
        <span className="sunsetTime">{sunSet}</span>
      </span>
      <span className="sun">
        <img
          src={sunimg}
          alt='Sun'
          style={{
            left: `calc(${sunPositionX} * 50% - 23px)`,
            bottom: `calc((${sunPositionY} * 100%) - 12px)`
          }}
        />
      </span>
    </div>
  );
}
