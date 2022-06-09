import { WeatherIcons } from '../WeatherIcons/WeatherIcons';
import styles from './forecastItem.module.css';
// TODO make context with configuration params such as hour format, temp unit
const ForecastItem = ({ weatherHourly }) => {
  return (
    // TODO:add dynamic style whith current hour
    <div className={styles.wheater__container}>
      <span class="whitespace-nowrap text-sm dark:text-white">
        {new Date(weatherHourly.time).toLocaleTimeString('en-US', {
          hour: '2-digit'
        })}
      </span>
      <div style={{ width: '64px' }}>
        <WeatherIcons
          code={weatherHourly.condition.code}
          isDay={weatherHourly.is_day}
        />
      </div>
      {/* TODO use unit from context to render temp in celsius or fahrenheit */}
      <p>{weatherHourly.temp_c} °</p>
    </div>
  );
};

export default ForecastItem;
