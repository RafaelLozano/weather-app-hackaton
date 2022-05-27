import ForecastItem from '../ForecastItem/ForecastItem';
import styles from './forecastList.module.css';
import { Card, Spin } from 'antd';
const ForecastList = ({ wheaterForecastHour = [], isFetching = false }) => {
  return (
    <Spin spinning={isFetching}>
      <div className={styles.list__container}>
        {wheaterForecastHour?.map(wheaterHour => {
          return (
            <ForecastItem key={wheaterHour?.time} wheaterHour={wheaterHour} />
          );
        })}
      </div>
    </Spin>
  );
};

export default ForecastList;
