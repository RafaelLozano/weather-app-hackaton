import { useEffect, useState } from 'react';
import { getWeatherFrom } from '../../services/weather';
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
import { WeatherIcons } from '../WeatherIcons/WeatherIcons';
import en from '../../i18n/en';
import es from '../../i18n/es';
import { useGeoLocation } from '../../hooks/useGeoLocation';
import React from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import Loading from '../Loading';
const TEST_DATA = {
  location: {
    name: 'Guadalupana [Granja]',
    region: 'Jalisco',
    country: 'Mexico',
    lat: 20.82,
    lon: -103.46,
    tz_id: 'America/Mexico_City',
    localtime_epoch: 1654747471,
    localtime: '2022-06-08 23:04'
  },
  current: {
    last_updated_epoch: 1654746300,
    last_updated: '2022-06-08 22:45',
    temp_c: 25.3,
    temp_f: 77.5,
    is_day: 0,
    condition: {
      text: 'Despejado',
      icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
      code: 1000
    },
    wind_mph: 8.1,
    wind_kph: 13,
    wind_degree: 220,
    wind_dir: 'SW',
    pressure_mb: 1006,
    pressure_in: 29.69,
    precip_mm: 0,
    precip_in: 0,
    humidity: 45,
    cloud: 10,
    feelslike_c: 25.8,
    feelslike_f: 78.4,
    vis_km: 10,
    vis_miles: 6,
    uv: 1,
    gust_mph: 11.4,
    gust_kph: 18.4
  },
  forecast: {
    forecastday: [
      {
        date: '2022-06-08',
        date_epoch: 1654646400,
        day: {
          maxtemp_c: 36.5,
          maxtemp_f: 97.7,
          mintemp_c: 18.9,
          mintemp_f: 66,
          avgtemp_c: 26.3,
          avgtemp_f: 79.3,
          maxwind_mph: 8.5,
          maxwind_kph: 13.7,
          totalprecip_mm: 1.1,
          totalprecip_in: 0.04,
          avgvis_km: 9.9,
          avgvis_miles: 6,
          avghumidity: 50,
          daily_will_it_rain: 1,
          daily_chance_of_rain: 78,
          daily_will_it_snow: 0,
          daily_chance_of_snow: 0,
          condition: {
            text: 'Lluvia  moderada a intervalos',
            icon: '//cdn.weatherapi.com/weather/64x64/day/176.png',
            code: 1063
          },
          uv: 11
        },
        astro: {
          sunrise: '07:12 AM',
          sunset: '08:33 PM',
          moonrise: '02:56 PM',
          moonset: '02:46 AM',
          moon_phase: 'First Quarter',
          moon_illumination: '61'
        },
        hour: [
          {
            time_epoch: 1654664400,
            time: '2022-06-08 00:00',
            temp_c: 22.6,
            temp_f: 72.7,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 6.7,
            wind_kph: 10.8,
            wind_degree: 266,
            wind_dir: 'W',
            pressure_mb: 1010,
            pressure_in: 29.83,
            precip_mm: 0,
            precip_in: 0,
            humidity: 61,
            cloud: 8,
            feelslike_c: 24.8,
            feelslike_f: 76.6,
            windchill_c: 22.6,
            windchill_f: 72.7,
            heatindex_c: 24.8,
            heatindex_f: 76.6,
            dewpoint_c: 14.7,
            dewpoint_f: 58.5,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 9.4,
            gust_kph: 15.1,
            uv: 1
          },
          {
            time_epoch: 1654668000,
            time: '2022-06-08 01:00',
            temp_c: 21.8,
            temp_f: 71.2,
            is_day: 0,
            condition: {
              text: 'Lluvia  moderada a intervalos',
              icon: '//cdn.weatherapi.com/weather/64x64/night/176.png',
              code: 1063
            },
            wind_mph: 4.3,
            wind_kph: 6.8,
            wind_degree: 256,
            wind_dir: 'WSW',
            pressure_mb: 1011,
            pressure_in: 29.85,
            precip_mm: 0.2,
            precip_in: 0.01,
            humidity: 66,
            cloud: 88,
            feelslike_c: 21.8,
            feelslike_f: 71.2,
            windchill_c: 21.8,
            windchill_f: 71.2,
            heatindex_c: 24.5,
            heatindex_f: 76.1,
            dewpoint_c: 15.1,
            dewpoint_f: 59.2,
            will_it_rain: 0,
            chance_of_rain: 68,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 5.8,
            gust_kph: 9.4,
            uv: 1
          },
          {
            time_epoch: 1654671600,
            time: '2022-06-08 02:00',
            temp_c: 21.1,
            temp_f: 70,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 4.3,
            wind_kph: 6.8,
            wind_degree: 263,
            wind_dir: 'W',
            pressure_mb: 1011,
            pressure_in: 29.85,
            precip_mm: 0,
            precip_in: 0,
            humidity: 69,
            cloud: 10,
            feelslike_c: 21.1,
            feelslike_f: 70,
            windchill_c: 21.1,
            windchill_f: 70,
            heatindex_c: 24.4,
            heatindex_f: 75.9,
            dewpoint_c: 15.2,
            dewpoint_f: 59.4,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 6,
            gust_kph: 9.7,
            uv: 1
          },
          {
            time_epoch: 1654675200,
            time: '2022-06-08 03:00',
            temp_c: 20.3,
            temp_f: 68.5,
            is_day: 0,
            condition: {
              text: 'Lluvia  moderada a intervalos',
              icon: '//cdn.weatherapi.com/weather/64x64/night/176.png',
              code: 1063
            },
            wind_mph: 3.6,
            wind_kph: 5.8,
            wind_degree: 275,
            wind_dir: 'W',
            pressure_mb: 1011,
            pressure_in: 29.85,
            precip_mm: 0.1,
            precip_in: 0,
            humidity: 73,
            cloud: 75,
            feelslike_c: 20.3,
            feelslike_f: 68.5,
            windchill_c: 20.3,
            windchill_f: 68.5,
            heatindex_c: 20.3,
            heatindex_f: 68.5,
            dewpoint_c: 15.3,
            dewpoint_f: 59.5,
            will_it_rain: 1,
            chance_of_rain: 72,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 5.1,
            gust_kph: 8.3,
            uv: 1
          },
          {
            time_epoch: 1654678800,
            time: '2022-06-08 04:00',
            temp_c: 19.9,
            temp_f: 67.8,
            is_day: 0,
            condition: {
              text: 'Lluvia  moderada a intervalos',
              icon: '//cdn.weatherapi.com/weather/64x64/night/176.png',
              code: 1063
            },
            wind_mph: 2.9,
            wind_kph: 4.7,
            wind_degree: 284,
            wind_dir: 'WNW',
            pressure_mb: 1011,
            pressure_in: 29.85,
            precip_mm: 0.3,
            precip_in: 0.01,
            humidity: 74,
            cloud: 86,
            feelslike_c: 19.9,
            feelslike_f: 67.8,
            windchill_c: 19.9,
            windchill_f: 67.8,
            heatindex_c: 19.9,
            heatindex_f: 67.8,
            dewpoint_c: 15.2,
            dewpoint_f: 59.4,
            will_it_rain: 1,
            chance_of_rain: 76,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 9,
            vis_miles: 5,
            gust_mph: 4.3,
            gust_kph: 6.8,
            uv: 1
          },
          {
            time_epoch: 1654682400,
            time: '2022-06-08 05:00',
            temp_c: 19.6,
            temp_f: 67.3,
            is_day: 0,
            condition: {
              text: 'Lluvia  moderada a intervalos',
              icon: '//cdn.weatherapi.com/weather/64x64/night/176.png',
              code: 1063
            },
            wind_mph: 2.7,
            wind_kph: 4.3,
            wind_degree: 292,
            wind_dir: 'WNW',
            pressure_mb: 1011,
            pressure_in: 29.85,
            precip_mm: 0.1,
            precip_in: 0,
            humidity: 76,
            cloud: 75,
            feelslike_c: 19.6,
            feelslike_f: 67.3,
            windchill_c: 19.6,
            windchill_f: 67.3,
            heatindex_c: 19.6,
            heatindex_f: 67.3,
            dewpoint_c: 15.2,
            dewpoint_f: 59.4,
            will_it_rain: 1,
            chance_of_rain: 74,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 3.8,
            gust_kph: 6.1,
            uv: 1
          },
          {
            time_epoch: 1654686000,
            time: '2022-06-08 06:00',
            temp_c: 19.2,
            temp_f: 66.6,
            is_day: 0,
            condition: {
              text: 'Lluvia  moderada a intervalos',
              icon: '//cdn.weatherapi.com/weather/64x64/night/176.png',
              code: 1063
            },
            wind_mph: 2,
            wind_kph: 3.2,
            wind_degree: 297,
            wind_dir: 'WNW',
            pressure_mb: 1011,
            pressure_in: 29.85,
            precip_mm: 0.1,
            precip_in: 0,
            humidity: 77,
            cloud: 81,
            feelslike_c: 19.2,
            feelslike_f: 66.6,
            windchill_c: 19.2,
            windchill_f: 66.6,
            heatindex_c: 19.2,
            heatindex_f: 66.6,
            dewpoint_c: 15.1,
            dewpoint_f: 59.2,
            will_it_rain: 1,
            chance_of_rain: 78,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 3.1,
            gust_kph: 5,
            uv: 1
          },
          {
            time_epoch: 1654689600,
            time: '2022-06-08 07:00',
            temp_c: 18.9,
            temp_f: 66,
            is_day: 0,
            condition: {
              text: 'Lluvia  moderada a intervalos',
              icon: '//cdn.weatherapi.com/weather/64x64/night/176.png',
              code: 1063
            },
            wind_mph: 1.6,
            wind_kph: 2.5,
            wind_degree: 290,
            wind_dir: 'WNW',
            pressure_mb: 1011,
            pressure_in: 29.87,
            precip_mm: 0.3,
            precip_in: 0.01,
            humidity: 79,
            cloud: 72,
            feelslike_c: 18.9,
            feelslike_f: 66,
            windchill_c: 18.9,
            windchill_f: 66,
            heatindex_c: 18.9,
            heatindex_f: 66,
            dewpoint_c: 15.1,
            dewpoint_f: 59.2,
            will_it_rain: 1,
            chance_of_rain: 71,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 9,
            vis_miles: 5,
            gust_mph: 2.5,
            gust_kph: 4,
            uv: 1
          },
          {
            time_epoch: 1654693200,
            time: '2022-06-08 08:00',
            temp_c: 19.6,
            temp_f: 67.3,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 0.9,
            wind_kph: 1.4,
            wind_degree: 325,
            wind_dir: 'NW',
            pressure_mb: 1012,
            pressure_in: 29.88,
            precip_mm: 0,
            precip_in: 0,
            humidity: 75,
            cloud: 18,
            feelslike_c: 19.6,
            feelslike_f: 67.3,
            windchill_c: 19.6,
            windchill_f: 67.3,
            heatindex_c: 19.6,
            heatindex_f: 67.3,
            dewpoint_c: 15.2,
            dewpoint_f: 59.4,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 1.1,
            gust_kph: 1.8,
            uv: 5
          },
          {
            time_epoch: 1654696800,
            time: '2022-06-08 09:00',
            temp_c: 21.8,
            temp_f: 71.2,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 0.7,
            wind_kph: 1.1,
            wind_degree: 206,
            wind_dir: 'SSW',
            pressure_mb: 1012,
            pressure_in: 29.88,
            precip_mm: 0,
            precip_in: 0,
            humidity: 65,
            cloud: 22,
            feelslike_c: 21.8,
            feelslike_f: 71.2,
            windchill_c: 21.8,
            windchill_f: 71.2,
            heatindex_c: 24.5,
            heatindex_f: 76.1,
            dewpoint_c: 14.9,
            dewpoint_f: 58.8,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 0.9,
            gust_kph: 1.4,
            uv: 6
          },
          {
            time_epoch: 1654700400,
            time: '2022-06-08 10:00',
            temp_c: 24.3,
            temp_f: 75.7,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 0.2,
            wind_kph: 0.4,
            wind_degree: 179,
            wind_dir: 'S',
            pressure_mb: 1012,
            pressure_in: 29.88,
            precip_mm: 0,
            precip_in: 0,
            humidity: 54,
            cloud: 13,
            feelslike_c: 25.5,
            feelslike_f: 77.9,
            windchill_c: 24.3,
            windchill_f: 75.7,
            heatindex_c: 25.5,
            heatindex_f: 77.9,
            dewpoint_c: 14.4,
            dewpoint_f: 57.9,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 0.2,
            gust_kph: 0.4,
            uv: 6
          },
          {
            time_epoch: 1654704000,
            time: '2022-06-08 11:00',
            temp_c: 29.9,
            temp_f: 85.8,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 0.4,
            wind_kph: 0.7,
            wind_degree: 75,
            wind_dir: 'ENE',
            pressure_mb: 1011,
            pressure_in: 29.85,
            precip_mm: 0,
            precip_in: 0,
            humidity: 45,
            cloud: 8,
            feelslike_c: 30.6,
            feelslike_f: 87.1,
            windchill_c: 29.9,
            windchill_f: 85.8,
            heatindex_c: 30.6,
            heatindex_f: 87.1,
            dewpoint_c: 16.5,
            dewpoint_f: 61.7,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 0.4,
            gust_kph: 0.7,
            uv: 7
          },
          {
            time_epoch: 1654707600,
            time: '2022-06-08 12:00',
            temp_c: 30.6,
            temp_f: 87.1,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 0.4,
            wind_kph: 0.7,
            wind_degree: 34,
            wind_dir: 'NE',
            pressure_mb: 1010,
            pressure_in: 29.83,
            precip_mm: 0,
            precip_in: 0,
            humidity: 37,
            cloud: 20,
            feelslike_c: 30.5,
            feelslike_f: 86.9,
            windchill_c: 30.6,
            windchill_f: 87.1,
            heatindex_c: 30.5,
            heatindex_f: 86.9,
            dewpoint_c: 14.4,
            dewpoint_f: 57.9,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 0.4,
            gust_kph: 0.7,
            uv: 8
          },
          {
            time_epoch: 1654711200,
            time: '2022-06-08 13:00',
            temp_c: 32.4,
            temp_f: 90.3,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 0.4,
            wind_kph: 0.7,
            wind_degree: 322,
            wind_dir: 'NW',
            pressure_mb: 1009,
            pressure_in: 29.8,
            precip_mm: 0,
            precip_in: 0,
            humidity: 32,
            cloud: 19,
            feelslike_c: 32,
            feelslike_f: 89.6,
            windchill_c: 32.4,
            windchill_f: 90.3,
            heatindex_c: 32,
            heatindex_f: 89.6,
            dewpoint_c: 13.5,
            dewpoint_f: 56.3,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 0.4,
            gust_kph: 0.7,
            uv: 8
          },
          {
            time_epoch: 1654714800,
            time: '2022-06-08 14:00',
            temp_c: 35.4,
            temp_f: 95.7,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 0.2,
            wind_kph: 0.4,
            wind_degree: 286,
            wind_dir: 'WNW',
            pressure_mb: 1008,
            pressure_in: 29.76,
            precip_mm: 0,
            precip_in: 0,
            humidity: 27,
            cloud: 8,
            feelslike_c: 35.2,
            feelslike_f: 95.4,
            windchill_c: 35.4,
            windchill_f: 95.7,
            heatindex_c: 35.2,
            heatindex_f: 95.4,
            dewpoint_c: 13.6,
            dewpoint_f: 56.5,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 0.2,
            gust_kph: 0.4,
            uv: 9
          },
          {
            time_epoch: 1654718400,
            time: '2022-06-08 15:00',
            temp_c: 36.1,
            temp_f: 97,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 0.4,
            wind_kph: 0.7,
            wind_degree: 261,
            wind_dir: 'W',
            pressure_mb: 1006,
            pressure_in: 29.72,
            precip_mm: 0,
            precip_in: 0,
            humidity: 23,
            cloud: 5,
            feelslike_c: 35.3,
            feelslike_f: 95.5,
            windchill_c: 36.1,
            windchill_f: 97,
            heatindex_c: 35.3,
            heatindex_f: 95.5,
            dewpoint_c: 11.8,
            dewpoint_f: 53.2,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 0.4,
            gust_kph: 0.7,
            uv: 9
          },
          {
            time_epoch: 1654722000,
            time: '2022-06-08 16:00',
            temp_c: 36.5,
            temp_f: 97.7,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 1.1,
            wind_kph: 1.8,
            wind_degree: 288,
            wind_dir: 'WNW',
            pressure_mb: 1005,
            pressure_in: 29.67,
            precip_mm: 0,
            precip_in: 0,
            humidity: 21,
            cloud: 6,
            feelslike_c: 35.2,
            feelslike_f: 95.4,
            windchill_c: 36.5,
            windchill_f: 97.7,
            heatindex_c: 35.2,
            heatindex_f: 95.4,
            dewpoint_c: 10.4,
            dewpoint_f: 50.7,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 1.3,
            gust_kph: 2.2,
            uv: 9
          },
          {
            time_epoch: 1654725600,
            time: '2022-06-08 17:00',
            temp_c: 35.6,
            temp_f: 96.1,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 2,
            wind_kph: 3.2,
            wind_degree: 294,
            wind_dir: 'WNW',
            pressure_mb: 1004,
            pressure_in: 29.63,
            precip_mm: 0,
            precip_in: 0,
            humidity: 19,
            cloud: 5,
            feelslike_c: 33.9,
            feelslike_f: 93,
            windchill_c: 35.6,
            windchill_f: 96.1,
            heatindex_c: 33.9,
            heatindex_f: 93,
            dewpoint_c: 8.3,
            dewpoint_f: 46.9,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 2.2,
            gust_kph: 3.6,
            uv: 9
          },
          {
            time_epoch: 1654729200,
            time: '2022-06-08 18:00',
            temp_c: 34.2,
            temp_f: 93.6,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 1.8,
            wind_kph: 2.9,
            wind_degree: 325,
            wind_dir: 'NW',
            pressure_mb: 1002,
            pressure_in: 29.6,
            precip_mm: 0,
            precip_in: 0,
            humidity: 18,
            cloud: 8,
            feelslike_c: 32.2,
            feelslike_f: 90,
            windchill_c: 34.2,
            windchill_f: 93.6,
            heatindex_c: 32.2,
            heatindex_f: 90,
            dewpoint_c: 6.4,
            dewpoint_f: 43.5,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 2,
            gust_kph: 3.2,
            uv: 8
          },
          {
            time_epoch: 1654732800,
            time: '2022-06-08 19:00',
            temp_c: 31.4,
            temp_f: 88.5,
            is_day: 1,
            condition: {
              text: 'Parcialmente nublado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
              code: 1003
            },
            wind_mph: 4.5,
            wind_kph: 7.2,
            wind_degree: 183,
            wind_dir: 'S',
            pressure_mb: 1003,
            pressure_in: 29.62,
            precip_mm: 0,
            precip_in: 0,
            humidity: 21,
            cloud: 51,
            feelslike_c: 29.3,
            feelslike_f: 84.7,
            windchill_c: 31.4,
            windchill_f: 88.5,
            heatindex_c: 29.3,
            heatindex_f: 84.7,
            dewpoint_c: 6.5,
            dewpoint_f: 43.7,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 5.1,
            gust_kph: 8.3,
            uv: 8
          },
          {
            time_epoch: 1654736400,
            time: '2022-06-08 20:00',
            temp_c: 27.8,
            temp_f: 82,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 8.5,
            wind_kph: 13.7,
            wind_degree: 200,
            wind_dir: 'SSW',
            pressure_mb: 1004,
            pressure_in: 29.65,
            precip_mm: 0,
            precip_in: 0,
            humidity: 34,
            cloud: 19,
            feelslike_c: 27.1,
            feelslike_f: 80.8,
            windchill_c: 27.8,
            windchill_f: 82,
            heatindex_c: 27.1,
            heatindex_f: 80.8,
            dewpoint_c: 10.5,
            dewpoint_f: 50.9,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 11.4,
            gust_kph: 18.4,
            uv: 7
          },
          {
            time_epoch: 1654740000,
            time: '2022-06-08 21:00',
            temp_c: 25.3,
            temp_f: 77.5,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 8.1,
            wind_kph: 13,
            wind_degree: 220,
            wind_dir: 'SW',
            pressure_mb: 1006,
            pressure_in: 29.69,
            precip_mm: 0,
            precip_in: 0,
            humidity: 45,
            cloud: 10,
            feelslike_c: 25.8,
            feelslike_f: 78.4,
            windchill_c: 25.3,
            windchill_f: 77.5,
            heatindex_c: 25.8,
            heatindex_f: 78.4,
            dewpoint_c: 12.5,
            dewpoint_f: 54.5,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 11.4,
            gust_kph: 18.4,
            uv: 1
          },
          {
            time_epoch: 1654743600,
            time: '2022-06-08 22:00',
            temp_c: 23.8,
            temp_f: 74.8,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 8.5,
            wind_kph: 13.7,
            wind_degree: 239,
            wind_dir: 'WSW',
            pressure_mb: 1007,
            pressure_in: 29.75,
            precip_mm: 0,
            precip_in: 0,
            humidity: 54,
            cloud: 10,
            feelslike_c: 25.2,
            feelslike_f: 77.4,
            windchill_c: 23.8,
            windchill_f: 74.8,
            heatindex_c: 25.2,
            heatindex_f: 77.4,
            dewpoint_c: 13.9,
            dewpoint_f: 57,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 11.9,
            gust_kph: 19.1,
            uv: 1
          },
          {
            time_epoch: 1654747200,
            time: '2022-06-08 23:00',
            temp_c: 22.9,
            temp_f: 73.2,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 4,
            wind_kph: 6.5,
            wind_degree: 250,
            wind_dir: 'WSW',
            pressure_mb: 1009,
            pressure_in: 29.8,
            precip_mm: 0,
            precip_in: 0,
            humidity: 59,
            cloud: 11,
            feelslike_c: 24.9,
            feelslike_f: 76.8,
            windchill_c: 22.9,
            windchill_f: 73.2,
            heatindex_c: 24.9,
            heatindex_f: 76.8,
            dewpoint_c: 14.5,
            dewpoint_f: 58.1,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 5.6,
            gust_kph: 9,
            uv: 1
          }
        ]
      }
    ]
  }
};
echarts.registerTheme('my_theme', {
  backgroundColor: 'rgb(15,23,42)',
  color: ['#c1232b', '#facc15', '#fcce10'],

  subtitleColor: '#aaaaaa',
  textColorShow: false,
  textColor: '#fff',
  markTextColor: '#fff',
  textStyle: {
    color: '#fff'
  },
  legendTextColor: '#f8fafc'
});

const Home = ({ location }) => {
  const [wheaterRawData, setWheaterRawData] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [forecastAstro, setForecastAstro] = useState(null);
  const [mobile, setMobile] = useState(false);

  const [unit, setUnit] = useState('celsius');
  const [language, setLanguage] = useState('es');
  const [cityQuery, setCityQuery] = useState(null);
  const [currentIP, setCurrentIP] = useState(null);
  const { lat, lon, error } = useGeoLocation();

  const t = language === 'es' ? es : en;

  const handleChangeUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  useEffect(() => {
    if (lat && lon) {
      getWeatherFrom(`${lat},${lon}`).then(res => {
        res.json().then(data => {
          setWheaterRawData(data);
          setForecastAstro(data.forecast.forecastday[0].astro);
          setIsFetching(false);
        });
      });
    }

    if (error) {
      message.error(error);
      console.log(error);
    }
  }, [lat, lon, error]);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line' }
    },
    legend: { textStyle: { color: '#fff' } },
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: wheaterRawData?.forecast?.forecastday?.[0]?.hour?.map(
        weatherHourly =>
          new Date(weatherHourly?.time).toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric'
          })
      )
    },
    yAxis: {
      type: 'value',
      name: 'Temperatura',
      min: 0,

      position: 'left',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        data: wheaterRawData?.forecast?.forecastday?.[0]?.hour?.map(
          weatherHourly => weatherHourly?.temp_c
        ),
        type: 'line',
        smooth: true,
        name: 'Temperatura'
      },
      {
        data: wheaterRawData?.forecast?.forecastday?.[0]?.hour?.map(
          weatherHourly => weatherHourly?.feelslike_c
        ),
        type: 'line',
        smooth: true,
        name: 'Sensación termica'
      }
    ]
  };

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
  if (isFetching) {
    return <Loading />;
  }
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
            <div
              style={{
                backgroundColor: 'rgb(15 23 42 / 1)',
                borderRadius: '10px'
              }}
            >
              <ReactECharts
                option={option}
                theme={'my_theme'}
                className="class_2"
              />
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
