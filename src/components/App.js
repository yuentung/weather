import React, { useState, useEffect, useMemo } from 'react';
import { Router, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import moment from 'moment';
import useWeatherApi from '../hooks/useWeatherApi';
import { locationList } from '../constants';
import sunriseAndSunsetData from '../constants/sunrise-sunset.json';
import WeatherSetting from './WeatherSetting';
import WeatherCard from './WeatherCard';
import history from '../history';

const theme = {
    light: {
        backgroundColor: '#ededed',
        foregroundColor: '#f9f9f9',
        boxShadow: '0 1px 3px 0 #999999',
        titleColor: '#212121',
        textColor: '#828282',
        temperatureColor: '#757575',
    },
    dark: {
        backgroundColor: '#1F2022',
        foregroundColor: '#121416',
        boxShadow: '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
        titleColor: '#f9f9fa',
        textColor: '#cccccc',
        temperatureColor: '#dddddd',
    },
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: ${({ theme }) => theme.backgroundColor};

    @media(max-width: 414px) {
        background-color: ${({ theme }) => theme.foregroundColor};
    }
`;

const findLocation = cityName => locationList.find(location => cityName === location.cityName);

const getMoment = locationName => {
    const locationData = sunriseAndSunsetData.find(locationData => locationName === locationData.locationName);
    if (!locationData) return null;

    const now = moment();
    const nowDate = now.format('YYYY-MM-DD');

    const dateData = locationData.time.find(({ dataTime }) => dataTime === nowDate);

    const sunriseTimestamp = moment(`${dateData.dataTime} ${dateData.sunrise}`, 'YYYY-MM-DD hh:mm:ss');
    const sunsetTimestamp = moment(`${dateData.dataTime} ${dateData.sunset}`, 'YYYY-MM-DD hh:mm:ss');
    const nowTimestamp = moment();

    return nowTimestamp.isBetween(sunriseTimestamp, sunsetTimestamp) ? 'day' : 'night';
};

const App = () => {
    const [currentTheme, setCurrentTheme] = useState('light');

    const [currentCity, setCurrentCity] = useState(localStorage.getItem('city') || '南投縣');
    const currentLocation = findLocation(currentCity) || {};

    const [weatherElement, fetchWeather] = useWeatherApi(currentLocation);

    const moment = useMemo(() => (
        getMoment(currentLocation.cityName)
    ), [currentLocation.cityName]);

    useEffect(() => {
        setCurrentTheme(moment === 'day' ? 'light' : 'dark');
    }, [moment]);

    useEffect(() => {
        localStorage.setItem('city', currentCity);
    }, [currentCity]);

    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <Container>
                <Router history={history}>
                    <Route
                        exact
                        path={`${process.env.PUBLIC_URL}/`}
                        component={() => (
                            <WeatherCard
                                cityName={currentLocation.cityName}
                                weatherElement={weatherElement}
                                moment={moment}
                                fetchWeather={fetchWeather}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={`${process.env.PUBLIC_URL}/setting`}
                        component={() => (
                            <WeatherSetting
                                cityName={currentLocation.cityName}
                                setCurrentCity={setCurrentCity}
                            />
                        )}
                    />
                </Router>
            </Container>
        </ThemeProvider>
    );
};

export default App;