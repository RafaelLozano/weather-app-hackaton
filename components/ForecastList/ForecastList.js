import ForecastItem from '../ForecastItem/ForecastItem';
import styles from './forecastList.module.css';
const ForecastList = ({ wheaterForecastHour = [] }) => {
  return (
    <div className={styles.list__container}>
      {wheaterForecastHour?.map(wheaterHour => {
        return (
          <ForecastItem key={wheaterHour?.time} wheaterHour={wheaterHour} />
        );
      })}
    </div>
  );
};

export default ForecastList;
