import { useEffect, useState } from 'react';
import { getWeatherFrom } from '../../services/wheater';
import { Drawer, Button, message, Tooltip, Spin, Input } from 'antd';
import Head from 'next/head';
import styles from './home.module.css';
import FooterMobile from '../FooterMobile/FooterMobile';
import ForecastList from '../ForecastList/ForecastList';
import { ClockCircleOutlined, DashboardOutlined } from '@ant-design/icons';
import sunset from '../../assets/sunset.png';
import sunrise from '../../assets/sunrise.png';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';

const Home = ({ location }) => {
  const [wheaterRawData, setWheaterRawData] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [forecastAstro, setForecastAstro] = useState(null);
  const [mobile, setMobile] = useState(false);

  //abstract this to global context
  const [unit, setUnit] = useState('celsius');
  const handleChangeUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  useEffect(() => {
    fetch('https://api.ipify.org?format=json', { method: 'GET' }).then(res => {
      res.json().then(data => {
        setIsFetching(true);
        if (location) {
          getWeatherFrom(location)
            .then(res => res.json())
            .then(data => {
              setWheaterRawData(data);
              setForecastAstro(data.forecast.forecastday[0].astro);
              setIsFetching(false);
            });
        } else {
          getWeatherFrom(data.ip)
            .then(res => res.json())
            .then(data => {
              setWheaterRawData(data);
              setForecastAstro(data.forecast.forecastday[0].astro);

              setIsFetching(false);
            });
        }
      });
    });
    setMobile(isMobile);
  }, []);
  const onSearch = value => console.log(value);
  return (
    <div>
      <Head>
        <title>{`Wheater ${wheaterRawData?.location?.name}`}</title>

        <meta name="twitter:title" content="wheater-app" />
        <meta
          name="twitter:creator"
          content="https://www.linkedin.com/in/rafael-lozano-rol%C3%B3n-218b7a160/"
        />
        <meta
          name="twitter:site"
          content="https://hackaton-wheater-rapidapi.netlify.app/"
        />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/RafaelLozano/wheater-hackaton/main/public/favicon.ico"
        />

        <meta property="og:title" content="wheater-app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://hackaton-wheater-rapidapi.netlify.app/"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/RafaelLozano/wheater-hackaton/main/public/favicon.ico"
        />
        <meta
          property="og:description"
          content="Aplicación para obtener el clima actual de una ciudad"
        />
        <meta property="og:site_name" content="Wheater-app" />
      </Head>
      <Spin spinning={isFetching}>
        <main
          className={
            wheaterRawData?.current?.is_day
              ? styles.main__container
              : styles.main__container_night
          }
        >
          {!mobile && (
            <header className={styles.header}>
              <div>
                <Input.Search
                  placeholder="input search text"
                  allowClear
                  onSearch={onSearch}
                  bordered={false}
                  style={{
                    width: 200
                  }}
                />
              </div>
            </header>
          )}
          <div className={styles.homeContainer}>
            <div className={styles.hero}>
              <Tooltip title={`Ubicación:`}>
                <h1>
                  {`${wheaterRawData?.location?.name}, 
                  ${wheaterRawData?.location?.region}`}
                </h1>
              </Tooltip>

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
            </div>
            <div className={styles.forecast__mainContainer}>
              <div className={styles.forecast__container}>
                <p>
                  <ClockCircleOutlined />
                  {'  Pronostico por hora'}
                </p>
                <ForecastList
                  isFetching={isFetching}
                  wheaterForecastHour={
                    wheaterRawData?.forecast?.forecastday?.[0]?.hour
                  }
                />
              </div>
              <div className={styles.wheaterSunset}>
                <div className={styles.forecast__container_half}>
                  <p>
                    <DashboardOutlined />
                    {'  Amancecer'}
                  </p>
                  <Image
                    className={styles.img__astro}
                    src={sunrise}
                    alt="sunrise-icon"
                    width="64px"
                    height="64px"
                  />
                  <h3>{forecastAstro?.sunrise}</h3>
                </div>
                <div className={styles.forecast__container_half}>
                  <p>
                    <DashboardOutlined />
                    {'  Atardecer'}
                  </p>
                  <Image
                    className={styles.img__astro}
                    src={sunset}
                    alt="sunrise-icon"
                    width="64px"
                    height="64px"
                  />
                  <h3>{forecastAstro?.sunset}</h3>
                </div>
              </div>
            </div>

            {mobile && (
              <FooterMobile
                handleChangeDrawer={value => setDrawerVisible(value)}
                drawerVisible={drawerVisible}
                wheaterCurrent={wheaterRawData?.current}
                wheaterUnit={unit}
              />
            )}
            <Drawer
              visible={drawerVisible}
              onClose={() => setDrawerVisible(false)}
              title={null}
              placement="bottom"
              headerStyle={{ display: 'none' }}
              bodyStyle={{
                backgroundColor: wheaterRawData?.current?.is_day
                  ? '#fff'
                  : 'rgba(139, 148, 161, 80%)'
              }}
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
                {unit === 'celsius'
                  ? 'Cambiar a farenheit'
                  : 'Cambiar a celsius'}
              </Button>
            </Drawer>
          </div>
        </main>
      </Spin>
    </div>
  );
};

export default Home;
