import { useEffect, useState } from 'react';
import { getWeatherFrom } from '../../services/wheater';
import { Drawer, Button } from 'antd';
import Head from 'next/head';
import styles from './home.module.css';
import FooterMobile from '../FooterMobile/FooterMobile';
import ForecastItem from '../ForecastItem/ForecastItem';
import ForecastList from '../ForecastList/ForecastList';
const Home = () => {
  const [wheaterRawData, setWheaterRawData] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  //abstract this to global context
  const [unit, setUnit] = useState('celsius');
  const handleChangeUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  useEffect(() => {
    getWeatherFrom('Guadalajara')
      .then(res => res.json())
      .then(data => setWheaterRawData(data));
  }, []);
  return (
    <div>
      <Head>
        <title>{`Wheater ${wheaterRawData?.location?.name}`}</title>
      </Head>
      <main className={styles.main__container}>
        <h1>{wheaterRawData?.location?.name}</h1>
        {unit === 'celsius' ? (
          <h1
            className={styles.h1__temp}
          >{`${wheaterRawData?.current?.temp_c} °`}</h1>
        ) : (
          <h1
            className={styles.h1__temp}
          >{`${wheaterRawData?.current?.temp_f} °`}</h1>
        )}
        <h3>{wheaterRawData?.current?.condition?.text}</h3>
        <div className={styles.forecast__container}>
          <p>Pronostico</p>
          <ForecastList
            wheaterForecastHour={
              wheaterRawData?.forecast?.forecastday?.[0]?.hour
            }
          />
        </div>

        {/* <FooterMobile
          handleChangeDrawer={value => setDrawerVisible(value)}
          drawerVisible={drawerVisible}
        /> */}
        <Drawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          title={null}
          placement="bottom"
          contentWrapperStyle={{
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            overflow: 'hidden'
          }}
          height={'420px'}
        >
          <h1>{wheaterRawData?.location?.name}</h1>
          <h2>Configuración</h2>
          <Button onClick={handleChangeUnit}>
            {unit === 'celsius' ? 'Cambiar a farenheit' : 'Cambiar a celsius'}
          </Button>
        </Drawer>
      </main>
    </div>
  );
};

export default Home;
