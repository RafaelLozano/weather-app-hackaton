import { useEffect, useState } from 'react';
import { getWeatherFrom } from '../../services/wheater';
import {
  Drawer,
  Button,
  message,
  Tooltip,
  Spin,
  Input,
  Form,
  Switch,
  Radio,
  Select
} from 'antd';
import Head from 'next/head';
import styles from './home.module.css';
import FooterMobile from '../FooterMobile/FooterMobile';
import ForecastList from '../ForecastList/ForecastList';
import {
  ClockCircleOutlined,
  DashboardOutlined,
  SettingOutlined,
  SearchOutlined
} from '@ant-design/icons';
import sunset from '../../assets/sunset.png';
import sunrise from '../../assets/sunrise.png';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';

import en from '../../i18n/en';
import es from '../../i18n/es';

const Home = ({ location }) => {
  const [wheaterRawData, setWheaterRawData] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [forecastAstro, setForecastAstro] = useState(null);
  const [mobile, setMobile] = useState(false);

  const [unit, setUnit] = useState('celsius');
  const [language, setLanguage] = useState('es');
  const [cityQuery, setCityQuery] = useState(null);
  const [currentIP, setCurrentIP] = useState(null);

  const t = language === 'es' ? es : en;

  const handleChangeUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  useEffect(() => {
    fetch('https://api.ipify.org?format=json', { method: 'GET' }).then(res => {
      res.json().then(data => {
        setIsFetching(true);
        setCurrentIP(data.ip);
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

  const handleSaveSettings = values => {
    setLanguage(values.language);
    setUnit(values.unit);
    setCityQuery(values.city);
    if (values.city || values.language) {
      getWeatherFrom(values.city, values.language)
        .then(res => res.json())
        .then(data => {
          setWheaterRawData(data);
          setForecastAstro(data.forecast.forecastday[0].astro);
          setIsFetching(false);
          message.success(
            values.language === 'es' ? es.message.success : en.message.success,
            2
          );
        });
    } else {
      handleChangeUnit();
      message.success(
        values.language === 'es' ? es.message.success : en.message.success,
        2
      );
    }
  };
  const handleChangeLanguage = lang => {
    setLanguage(lang);
    getWeatherFrom(location ? location : currentIP, lang)
      .then(res => res.json())
      .then(data => {
        setWheaterRawData(data);
        setForecastAstro(data.forecast.forecastday[0].astro);
        setIsFetching(false);
      });
  };
  const handleSearch = city => {
    getWeatherFrom(city, language)
      .then(res => res.json())
      .then(data => {
        setWheaterRawData(data);
        setForecastAstro(data.forecast.forecastday[0].astro);
        setIsFetching(false);
      });
  };
  return (
    <div>
      <Head>
        <title>{`${t.title}|${wheaterRawData?.location?.name}`}</title>

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
              <div className={styles.header__containerInner}>
                <div className={styles.custom__inputContainer}>
                  <SearchOutlined />
                  <input
                    placeholder={t.searchLabel}
                    type="search"
                    onChange={e => setCityQuery(e.target.value)}
                    value={cityQuery}
                    className={styles.search__input}
                  />
                  <Button
                    type="primary"
                    onClick={() => handleSearch(cityQuery)}
                  >
                    {t.searchButton}
                  </Button>
                </div>
                <Select
                  defaultValue={language}
                  onChange={value => {
                    handleChangeLanguage(value);
                  }}
                >
                  <Select.Option value="es">🇪🇸 Español</Select.Option>
                  <Select.Option value="en">🇺🇸 English</Select.Option>
                </Select>
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
                  {` ${t.hourly}`}
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
                    {` ${t.sunset}`}
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
                    {` ${t.sunrise}`}
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
                language={language}
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
              <h2>
                <SettingOutlined />
                {` ${t.footer.title}`}
              </h2>
              <Form onFinish={handleSaveSettings}>
                <Form.Item
                  name="city"
                  label="Ciudad"
                  rules={[
                    {
                      message: 'Por favor ingrese una ciudad'
                    }
                  ]}
                >
                  <Input placeholder="Ciudad" />
                </Form.Item>
                <Form.Item label="Unidad" name="unit" initialValue={unit}>
                  <Radio.Group>
                    <Radio value="celsius">Celsius</Radio>
                    <Radio value="fahrenheit">Fahrenheit</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Lenguaje"
                  name="language"
                  initialValue={language}
                >
                  <Select>
                    <Select.Option value="es">🇪🇸 Español</Select.Option>
                    <Select.Option value="en">🇺🇸 English</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Guardar
                  </Button>
                </Form.Item>
              </Form>
            </Drawer>
          </div>
        </main>
      </Spin>
    </div>
  );
};

export default Home;
