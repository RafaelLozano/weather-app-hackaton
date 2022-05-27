import { useEffect, useState } from 'react';
import { getWeatherFrom } from '../../services/wheater';
import { Drawer, Button, message } from 'antd';
import Head from 'next/head';
import styles from './home.module.css';
import FooterMobile from '../FooterMobile/FooterMobile';
import ForecastList from '../ForecastList/ForecastList';
import { ClockCircleOutlined, DashboardOutlined } from '@ant-design/icons';
const MOCK_DATA = {
  location: {
    name: 'Guadalajara',
    region: 'Jalisco',
    country: 'Mexico',
    lat: 20.67,
    lon: -103.39,
    tz_id: 'America/Mexico_City',
    localtime_epoch: 1653577711,
    localtime: '2022-05-26 10:08'
  },
  current: {
    last_updated_epoch: 1653573600,
    last_updated: '2022-05-26 09:00',
    temp_c: 23,
    temp_f: 73.4,
    is_day: 1,
    condition: {
      text: 'Parcialmente nublado',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      code: 1003
    },
    wind_mph: 3.8,
    wind_kph: 6.1,
    wind_degree: 70,
    wind_dir: 'ENE',
    pressure_mb: 1023,
    pressure_in: 30.2,
    precip_mm: 0,
    precip_in: 0,
    humidity: 27,
    cloud: 75,
    feelslike_c: 23.6,
    feelslike_f: 74.5,
    vis_km: 9.7,
    vis_miles: 6,
    uv: 6,
    gust_mph: 0.4,
    gust_kph: 0.7
  },
  forecast: {
    forecastday: [
      {
        date: '2022-05-26',
        date_epoch: 1653523200,
        day: {
          maxtemp_c: 37.1,
          maxtemp_f: 98.8,
          mintemp_c: 16,
          mintemp_f: 60.8,
          avgtemp_c: 25.7,
          avgtemp_f: 78.3,
          maxwind_mph: 11.4,
          maxwind_kph: 18.4,
          totalprecip_mm: 0.1,
          totalprecip_in: 0,
          avgvis_km: 10,
          avgvis_miles: 6,
          avghumidity: 25,
          daily_will_it_rain: 0,
          daily_chance_of_rain: 0,
          daily_will_it_snow: 0,
          daily_chance_of_snow: 0,
          condition: {
            text: 'Soleado',
            icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
            code: 1000
          },
          uv: 11
        },
        astro: {
          sunrise: '07:13 AM',
          sunset: '08:28 PM',
          moonrise: '04:46 AM',
          moonset: '05:26 PM',
          moon_phase: 'Waning Crescent',
          moon_illumination: '21'
        },
        hour: [
          {
            time_epoch: 1653541200,
            time: '2022-05-26 00:00',
            temp_c: 20.4,
            temp_f: 68.7,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 4.7,
            wind_kph: 7.6,
            wind_degree: 255,
            wind_dir: 'WSW',
            pressure_mb: 1012,
            pressure_in: 29.87,
            precip_mm: 0,
            precip_in: 0,
            humidity: 19,
            cloud: 0,
            feelslike_c: 20.4,
            feelslike_f: 68.7,
            windchill_c: 20.4,
            windchill_f: 68.7,
            heatindex_c: 20.4,
            heatindex_f: 68.7,
            dewpoint_c: -3.8,
            dewpoint_f: 25.2,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 9.8,
            gust_kph: 15.8,
            uv: 1
          },
          {
            time_epoch: 1653544800,
            time: '2022-05-26 01:00',
            temp_c: 19.5,
            temp_f: 67.1,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 4,
            wind_kph: 6.5,
            wind_degree: 269,
            wind_dir: 'W',
            pressure_mb: 1012,
            pressure_in: 29.89,
            precip_mm: 0,
            precip_in: 0,
            humidity: 26,
            cloud: 0,
            feelslike_c: 19.5,
            feelslike_f: 67.1,
            windchill_c: 19.5,
            windchill_f: 67.1,
            heatindex_c: 19.5,
            heatindex_f: 67.1,
            dewpoint_c: -0.4,
            dewpoint_f: 31.3,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 8.5,
            gust_kph: 13.7,
            uv: 1
          },
          {
            time_epoch: 1653548400,
            time: '2022-05-26 02:00',
            temp_c: 18.7,
            temp_f: 65.7,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 3.1,
            wind_kph: 5,
            wind_degree: 275,
            wind_dir: 'W',
            pressure_mb: 1012,
            pressure_in: 29.89,
            precip_mm: 0,
            precip_in: 0,
            humidity: 31,
            cloud: 0,
            feelslike_c: 18.7,
            feelslike_f: 65.7,
            windchill_c: 18.7,
            windchill_f: 65.7,
            heatindex_c: 18.7,
            heatindex_f: 65.7,
            dewpoint_c: 1.4,
            dewpoint_f: 34.5,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 6.5,
            gust_kph: 10.4,
            uv: 1
          },
          {
            time_epoch: 1653552000,
            time: '2022-05-26 03:00',
            temp_c: 17.8,
            temp_f: 64,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 2.7,
            wind_kph: 4.3,
            wind_degree: 265,
            wind_dir: 'W',
            pressure_mb: 1013,
            pressure_in: 29.9,
            precip_mm: 0,
            precip_in: 0,
            humidity: 35,
            cloud: 0,
            feelslike_c: 17.8,
            feelslike_f: 64,
            windchill_c: 17.8,
            windchill_f: 64,
            heatindex_c: 17.8,
            heatindex_f: 64,
            dewpoint_c: 2.2,
            dewpoint_f: 36,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 5.6,
            gust_kph: 9,
            uv: 1
          },
          {
            time_epoch: 1653555600,
            time: '2022-05-26 04:00',
            temp_c: 17.1,
            temp_f: 62.8,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 0.7,
            wind_kph: 1.1,
            wind_degree: 343,
            wind_dir: 'NNW',
            pressure_mb: 1013,
            pressure_in: 29.91,
            precip_mm: 0,
            precip_in: 0,
            humidity: 37,
            cloud: 0,
            feelslike_c: 17.1,
            feelslike_f: 62.8,
            windchill_c: 17.1,
            windchill_f: 62.8,
            heatindex_c: 17.1,
            heatindex_f: 62.8,
            dewpoint_c: 2.5,
            dewpoint_f: 36.5,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 1.3,
            gust_kph: 2.2,
            uv: 1
          },
          {
            time_epoch: 1653559200,
            time: '2022-05-26 05:00',
            temp_c: 16.6,
            temp_f: 61.9,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 0.7,
            wind_kph: 1.1,
            wind_degree: 338,
            wind_dir: 'NNW',
            pressure_mb: 1013,
            pressure_in: 29.92,
            precip_mm: 0,
            precip_in: 0,
            humidity: 38,
            cloud: 0,
            feelslike_c: 16.6,
            feelslike_f: 61.9,
            windchill_c: 16.6,
            windchill_f: 61.9,
            heatindex_c: 16.6,
            heatindex_f: 61.9,
            dewpoint_c: 2.4,
            dewpoint_f: 36.3,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 1.3,
            gust_kph: 2.2,
            uv: 1
          },
          {
            time_epoch: 1653562800,
            time: '2022-05-26 06:00',
            temp_c: 16.4,
            temp_f: 61.5,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 1.1,
            wind_kph: 1.8,
            wind_degree: 275,
            wind_dir: 'W',
            pressure_mb: 1014,
            pressure_in: 29.93,
            precip_mm: 0,
            precip_in: 0,
            humidity: 40,
            cloud: 0,
            feelslike_c: 16.4,
            feelslike_f: 61.5,
            windchill_c: 16.4,
            windchill_f: 61.5,
            heatindex_c: 16.4,
            heatindex_f: 61.5,
            dewpoint_c: 2.7,
            dewpoint_f: 36.9,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 2.5,
            gust_kph: 4,
            uv: 1
          },
          {
            time_epoch: 1653566400,
            time: '2022-05-26 07:00',
            temp_c: 16,
            temp_f: 60.8,
            is_day: 0,
            condition: {
              text: 'Despejado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              code: 1000
            },
            wind_mph: 0.9,
            wind_kph: 1.4,
            wind_degree: 332,
            wind_dir: 'NNW',
            pressure_mb: 1015,
            pressure_in: 29.96,
            precip_mm: 0,
            precip_in: 0,
            humidity: 41,
            cloud: 0,
            feelslike_c: 16,
            feelslike_f: 60.8,
            windchill_c: 16,
            windchill_f: 60.8,
            heatindex_c: 16,
            heatindex_f: 60.8,
            dewpoint_c: 2.7,
            dewpoint_f: 36.9,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 1.8,
            gust_kph: 2.9,
            uv: 1
          },
          {
            time_epoch: 1653570000,
            time: '2022-05-26 08:00',
            temp_c: 17.4,
            temp_f: 63.3,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 0.9,
            wind_kph: 1.4,
            wind_degree: 353,
            wind_dir: 'N',
            pressure_mb: 1015,
            pressure_in: 29.98,
            precip_mm: 0,
            precip_in: 0,
            humidity: 38,
            cloud: 0,
            feelslike_c: 17.4,
            feelslike_f: 63.3,
            windchill_c: 17.4,
            windchill_f: 63.3,
            heatindex_c: 17.4,
            heatindex_f: 63.3,
            dewpoint_c: 3,
            dewpoint_f: 37.4,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 1.8,
            gust_kph: 2.9,
            uv: 5
          },
          {
            time_epoch: 1653573600,
            time: '2022-05-26 09:00',
            temp_c: 21.6,
            temp_f: 70.9,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 0.4,
            wind_kph: 0.7,
            wind_degree: 320,
            wind_dir: 'NW',
            pressure_mb: 1015,
            pressure_in: 29.98,
            precip_mm: 0,
            precip_in: 0,
            humidity: 29,
            cloud: 0,
            feelslike_c: 21.6,
            feelslike_f: 70.9,
            windchill_c: 21.6,
            windchill_f: 70.9,
            heatindex_c: 23.1,
            heatindex_f: 73.6,
            dewpoint_c: 3,
            dewpoint_f: 37.4,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 0.4,
            gust_kph: 0.7,
            uv: 6
          },
          {
            time_epoch: 1653577200,
            time: '2022-05-26 10:00',
            temp_c: 25.3,
            temp_f: 77.5,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 1.1,
            wind_kph: 1.8,
            wind_degree: 45,
            wind_dir: 'NE',
            pressure_mb: 1015,
            pressure_in: 29.96,
            precip_mm: 0,
            precip_in: 0,
            humidity: 23,
            cloud: 0,
            feelslike_c: 24.3,
            feelslike_f: 75.7,
            windchill_c: 25.3,
            windchill_f: 77.5,
            heatindex_c: 24.3,
            heatindex_f: 75.7,
            dewpoint_c: 2.5,
            dewpoint_f: 36.5,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 1.3,
            gust_kph: 2.2,
            uv: 7
          },
          {
            time_epoch: 1653580800,
            time: '2022-05-26 11:00',
            temp_c: 31.5,
            temp_f: 88.7,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 1.1,
            wind_kph: 1.8,
            wind_degree: 87,
            wind_dir: 'E',
            pressure_mb: 1014,
            pressure_in: 29.94,
            precip_mm: 0,
            precip_in: 0,
            humidity: 17,
            cloud: 2,
            feelslike_c: 29.3,
            feelslike_f: 84.7,
            windchill_c: 31.5,
            windchill_f: 88.7,
            heatindex_c: 29.3,
            heatindex_f: 84.7,
            dewpoint_c: 3.7,
            dewpoint_f: 38.7,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 1.3,
            gust_kph: 2.2,
            uv: 8
          },
          {
            time_epoch: 1653584400,
            time: '2022-05-26 12:00',
            temp_c: 34.5,
            temp_f: 94.1,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 1.1,
            wind_kph: 1.8,
            wind_degree: 97,
            wind_dir: 'E',
            pressure_mb: 1013,
            pressure_in: 29.91,
            precip_mm: 0,
            precip_in: 0,
            humidity: 13,
            cloud: 5,
            feelslike_c: 32.6,
            feelslike_f: 90.7,
            windchill_c: 34.5,
            windchill_f: 94.1,
            heatindex_c: 32.6,
            heatindex_f: 90.7,
            dewpoint_c: 2,
            dewpoint_f: 35.6,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 1.3,
            gust_kph: 2.2,
            uv: 8
          },
          {
            time_epoch: 1653588000,
            time: '2022-05-26 13:00',
            temp_c: 36.6,
            temp_f: 97.9,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 0.7,
            wind_kph: 1.1,
            wind_degree: 111,
            wind_dir: 'ESE',
            pressure_mb: 1012,
            pressure_in: 29.88,
            precip_mm: 0,
            precip_in: 0,
            humidity: 10,
            cloud: 10,
            feelslike_c: 35.2,
            feelslike_f: 95.4,
            windchill_c: 36.6,
            windchill_f: 97.9,
            heatindex_c: 35.2,
            heatindex_f: 95.4,
            dewpoint_c: 0.4,
            dewpoint_f: 32.7,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 0.9,
            gust_kph: 1.4,
            uv: 9
          },
          {
            time_epoch: 1653591600,
            time: '2022-05-26 14:00',
            temp_c: 35.6,
            temp_f: 96.1,
            is_day: 1,
            condition: {
              text: 'Parcialmente nublado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
              code: 1003
            },
            wind_mph: 1.1,
            wind_kph: 1.8,
            wind_degree: 87,
            wind_dir: 'E',
            pressure_mb: 1010,
            pressure_in: 29.84,
            precip_mm: 0,
            precip_in: 0,
            humidity: 9,
            cloud: 33,
            feelslike_c: 33.9,
            feelslike_f: 93,
            windchill_c: 35.6,
            windchill_f: 96.1,
            heatindex_c: 33.9,
            heatindex_f: 93,
            dewpoint_c: -2.5,
            dewpoint_f: 27.5,
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
            time_epoch: 1653595200,
            time: '2022-05-26 15:00',
            temp_c: 36,
            temp_f: 96.8,
            is_day: 1,
            condition: {
              text: 'Parcialmente nublado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
              code: 1003
            },
            wind_mph: 2.2,
            wind_kph: 3.6,
            wind_degree: 95,
            wind_dir: 'E',
            pressure_mb: 1009,
            pressure_in: 29.8,
            precip_mm: 0,
            precip_in: 0,
            humidity: 8,
            cloud: 33,
            feelslike_c: 34.4,
            feelslike_f: 93.9,
            windchill_c: 36,
            windchill_f: 96.8,
            heatindex_c: 34.4,
            heatindex_f: 93.9,
            dewpoint_c: -3.2,
            dewpoint_f: 26.2,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 2.5,
            gust_kph: 4,
            uv: 9
          },
          {
            time_epoch: 1653598800,
            time: '2022-05-26 16:00',
            temp_c: 35.8,
            temp_f: 96.4,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 1.3,
            wind_kph: 2.2,
            wind_degree: 182,
            wind_dir: 'S',
            pressure_mb: 1007,
            pressure_in: 29.75,
            precip_mm: 0,
            precip_in: 0,
            humidity: 8,
            cloud: 16,
            feelslike_c: 34.2,
            feelslike_f: 93.6,
            windchill_c: 35.8,
            windchill_f: 96.4,
            heatindex_c: 34.2,
            heatindex_f: 93.6,
            dewpoint_c: -2.8,
            dewpoint_f: 27,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 1.6,
            gust_kph: 2.5,
            uv: 9
          },
          {
            time_epoch: 1653602400,
            time: '2022-05-26 17:00',
            temp_c: 37.1,
            temp_f: 98.8,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 1.3,
            wind_kph: 2.2,
            wind_degree: 179,
            wind_dir: 'S',
            pressure_mb: 1006,
            pressure_in: 29.7,
            precip_mm: 0,
            precip_in: 0,
            humidity: 9,
            cloud: 5,
            feelslike_c: 35.8,
            feelslike_f: 96.4,
            windchill_c: 37.1,
            windchill_f: 98.8,
            heatindex_c: 35.8,
            heatindex_f: 96.4,
            dewpoint_c: -0.7,
            dewpoint_f: 30.7,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 1.6,
            gust_kph: 2.5,
            uv: 9
          },
          {
            time_epoch: 1653606000,
            time: '2022-05-26 18:00',
            temp_c: 30.8,
            temp_f: 87.4,
            is_day: 1,
            condition: {
              text: 'Parcialmente nublado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
              code: 1003
            },
            wind_mph: 10.7,
            wind_kph: 17.3,
            wind_degree: 69,
            wind_dir: 'ENE',
            pressure_mb: 1007,
            pressure_in: 29.74,
            precip_mm: 0,
            precip_in: 0,
            humidity: 19,
            cloud: 28,
            feelslike_c: 28.6,
            feelslike_f: 83.5,
            windchill_c: 30.8,
            windchill_f: 87.4,
            heatindex_c: 28.6,
            heatindex_f: 83.5,
            dewpoint_c: 4.5,
            dewpoint_f: 40.1,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 12.3,
            gust_kph: 19.8,
            uv: 8
          },
          {
            time_epoch: 1653609600,
            time: '2022-05-26 19:00',
            temp_c: 29.7,
            temp_f: 85.5,
            is_day: 1,
            condition: {
              text: 'Soleado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000
            },
            wind_mph: 11.4,
            wind_kph: 18.4,
            wind_degree: 30,
            wind_dir: 'NNE',
            pressure_mb: 1008,
            pressure_in: 29.75,
            precip_mm: 0,
            precip_in: 0,
            humidity: 20,
            cloud: 10,
            feelslike_c: 27.5,
            feelslike_f: 81.5,
            windchill_c: 29.7,
            windchill_f: 85.5,
            heatindex_c: 27.5,
            heatindex_f: 81.5,
            dewpoint_c: 4.6,
            dewpoint_f: 40.3,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 13.2,
            gust_kph: 21.2,
            uv: 7
          },
          {
            time_epoch: 1653613200,
            time: '2022-05-26 20:00',
            temp_c: 27.7,
            temp_f: 81.9,
            is_day: 1,
            condition: {
              text: 'Parcialmente nublado',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
              code: 1003
            },
            wind_mph: 3.4,
            wind_kph: 5.4,
            wind_degree: 74,
            wind_dir: 'ENE',
            pressure_mb: 1008,
            pressure_in: 29.77,
            precip_mm: 0,
            precip_in: 0,
            humidity: 22,
            cloud: 45,
            feelslike_c: 25.9,
            feelslike_f: 78.6,
            windchill_c: 27.7,
            windchill_f: 81.9,
            heatindex_c: 25.9,
            heatindex_f: 78.6,
            dewpoint_c: 3.9,
            dewpoint_f: 39,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 5.4,
            gust_kph: 8.6,
            uv: 7
          },
          {
            time_epoch: 1653616800,
            time: '2022-05-26 21:00',
            temp_c: 25.6,
            temp_f: 78.1,
            is_day: 0,
            condition: {
              text: 'Parcialmente nublado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
              code: 1003
            },
            wind_mph: 6,
            wind_kph: 9.7,
            wind_degree: 137,
            wind_dir: 'SE',
            pressure_mb: 1011,
            pressure_in: 29.85,
            precip_mm: 0,
            precip_in: 0,
            humidity: 29,
            cloud: 28,
            feelslike_c: 25,
            feelslike_f: 77,
            windchill_c: 25.6,
            windchill_f: 78.1,
            heatindex_c: 25,
            heatindex_f: 77,
            dewpoint_c: 6.2,
            dewpoint_f: 43.2,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 10.3,
            gust_kph: 16.6,
            uv: 1
          },
          {
            time_epoch: 1653620400,
            time: '2022-05-26 22:00',
            temp_c: 24.8,
            temp_f: 76.6,
            is_day: 0,
            condition: {
              text: 'Lluvia  moderada a intervalos',
              icon: '//cdn.weatherapi.com/weather/64x64/night/176.png',
              code: 1063
            },
            wind_mph: 4.5,
            wind_kph: 7.2,
            wind_degree: 195,
            wind_dir: 'SSW',
            pressure_mb: 1012,
            pressure_in: 29.87,
            precip_mm: 0.1,
            precip_in: 0,
            humidity: 33,
            cloud: 86,
            feelslike_c: 24.8,
            feelslike_f: 76.6,
            windchill_c: 24.8,
            windchill_f: 76.6,
            heatindex_c: 24.8,
            heatindex_f: 76.6,
            dewpoint_c: 7.3,
            dewpoint_f: 45.1,
            will_it_rain: 1,
            chance_of_rain: 88,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 7.8,
            gust_kph: 12.6,
            uv: 1
          },
          {
            time_epoch: 1653624000,
            time: '2022-05-26 23:00',
            temp_c: 24.5,
            temp_f: 76.1,
            is_day: 0,
            condition: {
              text: 'Parcialmente nublado',
              icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
              code: 1003
            },
            wind_mph: 3.4,
            wind_kph: 5.4,
            wind_degree: 269,
            wind_dir: 'W',
            pressure_mb: 1012,
            pressure_in: 29.88,
            precip_mm: 0,
            precip_in: 0,
            humidity: 35,
            cloud: 47,
            feelslike_c: 24.7,
            feelslike_f: 76.5,
            windchill_c: 24.5,
            windchill_f: 76.1,
            heatindex_c: 24.7,
            heatindex_f: 76.5,
            dewpoint_c: 7.9,
            dewpoint_f: 46.2,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_mph: 6,
            gust_kph: 9.7,
            uv: 1
          }
        ]
      }
    ]
  }
};
const Home = () => {
  const [wheaterRawData, setWheaterRawData] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [forecastAstro, setForecastAstro] = useState(null);

  //abstract this to global context
  const [unit, setUnit] = useState('celsius');
  const handleChangeUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  useEffect(() => {
    // setIsFetching(true);
    // getWeatherFrom('Guadalajara')
    //   .then(res => res.json())
    //   .then(data => {
    //     setWheaterRawData(data);
    //     setIsFetching(false);
    //   });
    setWheaterRawData(MOCK_DATA);
    setForecastAstro(MOCK_DATA.forecast.forecastday[0].astro);
  }, []);
  return (
    <div>
      <Head>
        <title>{`Wheater ${wheaterRawData?.location?.name}`}</title>
      </Head>
      <main className={styles.main__container}>
        <div className={styles.hero}>
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
              <img
                className={styles.img__astro}
                src="//cdn.weatherapi.com/weather/64x64/day/113.png"
                alt="sunrise-icon"
              />
              <h3>{forecastAstro?.sunrise}</h3>
            </div>
            <div className={styles.forecast__container_half}>
              <p>
                <DashboardOutlined />
                {'  Amancecer'}
              </p>
              <img
                className={styles.img__astro}
                src="//cdn.weatherapi.com/weather/64x64/day/113.png"
                alt="sunrise-icon"
              />
              <h3>{forecastAstro?.sunrise}</h3>
            </div>
          </div>
        </div>

        <FooterMobile
          handleChangeDrawer={value => setDrawerVisible(value)}
          drawerVisible={drawerVisible}
          wheaterCurrent={wheaterRawData?.current}
          wheaterUnit={unit}
        />
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
