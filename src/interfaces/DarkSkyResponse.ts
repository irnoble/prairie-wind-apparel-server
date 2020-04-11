export interface DarkSkyResponse {
	statusCode?: number,
	errorCode?: string,
	message?: string,
	lat?: number,
	lon?: number,
	precipitation_type?: PrecipitationType,
	observation_time?: PrecipitationType
}

interface PrecipitationType {
	value: string
}

export interface WeatherData {
	status: number,
	weatherData?: DarkSkyResponse,
	error?: string
}
