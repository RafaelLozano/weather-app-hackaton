import { rest } from 'msw';

export const handlers = [
  rest.get(
    'https://weatherapi-com.p.rapidapi.com/current.json*',
    (req, res, ctx) => {
      return res(
        ctx.json({
          location: {
            name: 'Guadalajara',
            region: 'Jalisco',
            country: 'Mexico',
            lat: 20.67,
            lon: -103.39,
            tz_id: 'America/Mexico_City',
            localtime_epoch: 1653512981,
            localtime: '2022-05-25 16:09'
          },
          current: {
            last_updated_epoch: 1653508800,
            last_updated: '2022-05-25 15:00',
            temp_c: 32,
            temp_f: 89.6,
            is_day: 1,
            condition: {
              text: 'Partly cloudy',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
              code: 1003
            },
            wind_mph: 16.1,
            wind_kph: 25.9,
            wind_degree: 300,
            wind_dir: 'WNW',
            pressure_mb: 1017,
            pressure_in: 30.02,
            precip_mm: 0,
            precip_in: 0,
            humidity: 3,
            cloud: 25,
            feelslike_c: 29.8,
            feelslike_f: 85.6,
            vis_km: 16,
            vis_miles: 9,
            uv: 9,
            gust_mph: 4,
            gust_kph: 6.5
          }
        })
      );
    }
  )
];
