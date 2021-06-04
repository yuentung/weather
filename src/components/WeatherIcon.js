import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as DayThunderstorm } from '../images/day-thunderstorm.svg';
import { ReactComponent as DayClear } from '../images/day-clear.svg';
import { ReactComponent as DayCloudyFog } from '../images/day-cloudy-fog.svg';
import { ReactComponent as DayCloudy } from '../images/day-cloudy.svg';
import { ReactComponent as DayFog } from '../images/day-fog.svg';
import { ReactComponent as DayPartiallyClearWithRain } from '../images/day-partially-clear-with-rain.svg';
import { ReactComponent as DaySnowing } from '../images/day-snowing.svg';
import { ReactComponent as NightThunderstorm } from '../images/night-thunderstorm.svg';
import { ReactComponent as NightClear } from '../images/night-clear.svg';
import { ReactComponent as NightCloudyFog } from '../images/night-cloudy-fog.svg';
import { ReactComponent as NightCloudy } from '../images/night-cloudy.svg';
import { ReactComponent as NightFog } from '../images/night-fog.svg';
import { ReactComponent as NightPartiallyClearWithRain } from '../images/night-partially-clear-with-rain.svg';
import { ReactComponent as NightSnowing } from '../images/night-snowing.svg';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    svg {
        max-height: 150px;
    }
`;

// weatherCode => weatherType
const weatherTypes = {
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isClear: [1],
    isCloudyFog: [25, 26, 27, 28],
    isCloudy: [2, 3, 4, 5, 6, 7],
    isFog: [24],
    isPartiallyClearWithRain: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39],
    isSnowing: [23, 37, 42],
};

// moment + weatherType => weatherIcon
const weatherIcons = {
    day: {
        isThunderstorm: <DayThunderstorm />,
        isClear: <DayClear />,
        isCloudyFog: <DayCloudyFog />,
        isCloudy: <DayCloudy />,
        isFog: <DayFog />,
        isPartiallyClearWithRain: <DayPartiallyClearWithRain />,
        isSnowing: <DaySnowing />,
    },
    night: {
        isThunderstorm: <NightThunderstorm />,
        isClear: <NightClear />,
        isCloudyFog: <NightCloudyFog />,
        isCloudy: <NightCloudy />,
        isFog: <NightFog />,
        isPartiallyClearWithRain: <NightPartiallyClearWithRain />,
        isSnowing: <NightSnowing />,
    },
};

const weatherCode2Type = (weatherCode) => {
    const [weatherType] = Object.entries(weatherTypes).find(([weatherType, weatherCodes]) =>
        weatherCodes.includes(weatherCode)
    ) || [];

    return weatherType;
};

const WeatherIcon = ({ weatherCode, moment }) => {
    const [weatherType, setWeatherType] = useState('');

    // 當 weatherCode 沒有改變、moment 改變時，
    // 會重新 render，但並不需要再次進行 weatherCode2Type 的運算，
    // 所以使用 useMemo 根據「weatherCode 是否改變」來進行運算即可。
    const currentWeatherType = useMemo(() => {
        return weatherCode2Type(weatherCode);
    }, [weatherCode]);

    useEffect(() => {
        setWeatherType(currentWeatherType);
    }, [currentWeatherType]);

    return (
        <Wrapper>
            {weatherIcons[moment][weatherType]}
        </Wrapper>
    );
};

export default WeatherIcon;