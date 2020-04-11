import express from 'express';
const expressip = require('express-ip');
const cors = require('cors')
import { IGetIpInfoRequest, IpInfo } from './interfaces/IpInfo';
import { WeatherData } from './interfaces/DarkSkyResponse';
import { getWeatherForLocation } from './api';

const app = express();
const PORT: string = process.env.PORT || "5000";

app.use(cors());
app.use(expressip().getIpInfoMiddleware);
app.set("PORT", PORT);

const getIsLatLonValid = (lat: number, lon: number): boolean =>
  lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180

app.get('/', (req: IGetIpInfoRequest, res) => {
  const ipInfo: IpInfo = req.ipInfo;
  const message: string = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country}`;
  res.send(message);
});

app.get('/localWeather', async (req: IGetIpInfoRequest, res) => {
  const ipInfo: IpInfo = req.ipInfo;
  if (!ipInfo) {
    res.status(400).send({error: 'IP not found in request'});
  }

  const lat: number = ipInfo.ll[0];
  const lon: number = ipInfo.ll[1];
  if (!getIsLatLonValid(lat, lon)) {
    res.status(400).send({error: `Latitude/Longitude invalid. Latitude: ${lat} Longitude: ${lon}`});
  }
  const response: WeatherData = await getWeatherForLocation(lat, lon)
  const responseData: string = response.status === 200
    ? response.weatherData.precipitation_type.value
    : `Weather not found. Error: ${response.error}`;

  res.status(response.status).send(responseData);
});

app.listen(app.get('PORT'), () => {
  console.log(`Weather API started on PORT ${app.get('PORT')}`);
});
