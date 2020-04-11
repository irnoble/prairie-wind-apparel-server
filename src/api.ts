import fetch from 'node-fetch';
import memoize from 'memoizee';
import { DarkSkyResponse, WeatherData } from './interfaces/DarkSkyResponse';

const DARK_SKY_API_KEY: string = 'CsM81rFmB7AvBJpV0hnzqill15VLHu1F';
const CACHE_EXPIRATION_TIME: number = 600000; // 10 minutes
// none, rain, snow, ice pellets, and freezing rain

/**
 * Gets the current weather for a latitude and longitude using the DarkSky Api
 *
 * @param lat number Latitude
 * @param lon number Longitude
 *
 * @return object The response status and either weatherData(if successful) or an error message(if not)
 */
export const getWeatherForLocation = memoize(async (lat: number, lon: number) : Promise<WeatherData> => {
  const url: string = `https://api.climacell.co/v3/weather/realtime?lat=${lat}&lon=${lon}&unit_system=si&fields=precipitation_type&apikey=${DARK_SKY_API_KEY}`;

  try {
    const response: any = await fetch(url);
    const darkSkyResponse: DarkSkyResponse = await response.json();
    if (response.status === 200) {
    	return {status: response.status, weatherData: darkSkyResponse};
    } else {
    	return {status: response.status, error: darkSkyResponse.message};
    }
  } catch (error) {
    return {status: 500, error: error.message};
  }
}, {
  length: 2,
  maxAge: CACHE_EXPIRATION_TIME
});
