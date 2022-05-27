import { Card } from 'antd';
import styles from './forecastItem.module.css';
// TODO make context with configuration params such as hour format, temp unit
const ForecastItem = ({ wheaterHour }) => {
  return (
    <div className={styles.wheater__container}>
      <p>
        {new Date(wheaterHour.time).toLocaleTimeString('es', {
          hour12: true,
          hour: '2-digit'
        })}
      </p>
      <img src={wheaterHour.condition.icon} alt={wheaterHour.condition.text} />
      {/* TODO use unit from context to render temp in celsius or fahrenheit */}
      <p>{wheaterHour.temp_c} °</p>
    </div>
  );
};

export default ForecastItem;
