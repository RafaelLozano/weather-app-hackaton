import ForecastItem from '../ForecastItem/ForecastItem';
import styles from './forecastList.module.css';
import { Card, Spin } from 'antd';
const ForecastList = ({ wheaterForecastHour = [], isFetching = false }) => {
  return (
    <Spin spinning={isFetching}>
      <div className={styles.list__container}>
        {wheaterForecastHour?.map(weatherHourly => {
          return (
            <ForecastItem
              key={weatherHourly?.time}
              weatherHourly={weatherHourly}
            />
          );
        })}
      </div>
    </Spin>
  );
};

export default ForecastList;
