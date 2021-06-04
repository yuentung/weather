import { useState, useEffect, useCallback } from 'react';
import weather, { API_KEY } from '../apis/weather';

const fetchCurrentWeather = async locationName => {
    const response = await weather.get('/v1/rest/datastore/O-A0003-001', {
        params: {
            Authorization: API_KEY,
            locationName,
        },
    });

    const data = response.data.records.location[0];

    const { obsTime, TEMP, WDSD, HUMD } = data.weatherElement.reduce((neededElement, { elementName, elementValue }) => {
        if (['TEMP', 'WDSD', 'HUMD'].includes(elementName)) {
            neededElement[elementName] = elementValue;
        }

        return neededElement;
    }, { obsTime: data.time.obsTime, });

    return {
        observationTime: obsTime,
        temperature: TEMP,
        windSpeed: WDSD,
        humidity: HUMD,
    };
};

const fetchForecastWeather = async cityName => {
    const response = await weather.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001', {
        params: {
            Authorization: API_KEY,
            locationName: cityName,
        },
    });

    const locationData = response.data.records.location[0];

    const { Wx, PoP } = locationData.weatherElement.reduce((neededElement, { elementName, time }) => {
        if (elementName === 'Wx') {
            neededElement[elementName] = [time[0].parameter.parameterName, time[0].parameter.parameterValue];
        } else {
            neededElement[elementName] = time[0].parameter.parameterName;
        }

        return neededElement;
    }, {});

    return {
        description: Wx[0],
        weatherCode: Number(Wx[1]),
        rainPossibility: PoP,
    };
};

const useWeatherApi = ({ locationName, cityName }) => {
    const [weatherElement, setWeatherElement] = useState({
        observationTime: '',
        description: '',
        weatherCode: 0,
        temperature: 0,
        windSpeed: 0,
        rainPossibility: 0,
        humidity: 0,
        isLoading: true,
    });

    const fetchWeather = useCallback(() => {
        const fetchData = async () => {
            const [currentWeather, forecastWeather] = await Promise.all([
                fetchCurrentWeather(locationName),
                fetchForecastWeather(cityName),
            ]);

            setWeatherElement({
                ...currentWeather,
                ...forecastWeather,
                isLoading: false,
            });
        };

        setWeatherElement(prevState => ({
            ...prevState,
            isLoading: true,
        }))

        fetchData();
    }, [locationName, cityName]);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    return [weatherElement, fetchWeather];
};

export default useWeatherApi;