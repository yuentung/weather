import React from 'react';
import styled from '@emotion/styled';
import WeatherIcon from './WeatherIcon';
import Parameter from './Parameter';
import { ReactComponent as WindSpeedIcon } from '../images/airFlow.svg';
import { ReactComponent as HumidIcon } from '../images/humid.svg';
import { ReactComponent as RainIcon } from '../images/rain.svg';
import { ReactComponent as CogIcon } from '../images/cog.svg';
import { ReactComponent as RefreshIcon } from '../images/refresh.svg';
import { ReactComponent as LoadingIcon } from '../images/loading.svg';

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 360px;
    padding: 30px 0 60px;
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor};

    @media(max-width: 414px) {
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 60px 0 90px;
        box-shadow: none;
    }
`;

const TitleWrapper = styled.div`
    margin-bottom: 30px;
`;

const Location = styled.h1`
    margin-bottom: 20px;
    text-align: center;
    font-size: 28px;
    color: ${({ theme }) => theme.titleColor};

    @media (max-width: 414px) {
        font-size: 36px;
    }
`;

const Description = styled.p`
    text-align: center;
    font-size: 16px;
    color: ${({ theme }) => theme.textColor};

    @media (max-width: 414px) {
        font-size: 20px;
    }
`;

const Temperature = styled.p`
    margin-bottom: 30px;
    font-size: 64px;
    font-weight: 300;
    color: ${({ theme }) => theme.temperatureColor};

    span {
        vertical-align: top;
        font-size: 36px;
        font-weight: 400;
    }

    @media (max-width: 414px) {
        font-size: 84px;

        span {
            font-size: 42px;
        }
    }
`;

const ParameterWrapper = styled.div`
    display: flex;
    justify-content: center;

    > div + div {
        position: relative;
        margin-left: 32px;

        :after {
            content: '';
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            left: -15px;
            width: 2px;
            height: calc(100% - 8px);
            border-radius: 1px;
            background-color: ${({ theme }) => theme.backgroundColor};
        }
    }
`;

const ObservationTime = styled.p`
    position: absolute;
    bottom: 15px;
    font-size: 14px;
    color: ${({ theme }) => theme.textColor};

    @media (max-width: 414px) {
        bottom: 30px;
        text-align: center;
    }
`;

const Cog = styled(CogIcon)`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 15px;
    height: 15px;
    cursor: pointer;

    @media (max-width: 414px) {
        top: 20px;
        right: 20px;
        width: 20px;
        height: 20px;
    }
`;

const Refresh = styled(RefreshIcon)`
    position: absolute;
    top: 15px;
    right: 45px;
    width: 15px;
    height: 15px;
    cursor: pointer;

    @media (max-width: 414px) {
        top: 20px;
        right: 60px;
        bottom: auto;
        width: 20px;
        height: 20px;
    }
`;

const LoadingWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.7);
`;

const Loading = styled(LoadingIcon)`
    width: 60px;
    height: 60px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: 1.5s;

    @keyframes rotate {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
`;

const WeatherCard = ({ cityName, weatherElement, moment, fetchWeather, setCurrentPage }) => {
    const {
        observationTime,
        description,
        temperature,
        weatherCode,
        windSpeed,
        rainPossibility,
        humidity,
        isLoading,
    } = weatherElement;

    return (
        <Wrapper>
            <TitleWrapper>
                <Location>{cityName}</Location>
                <Description>{description}</Description>
            </TitleWrapper>
            <WeatherIcon
                weatherCode={weatherCode}
                moment={moment || 'day'}
            />
            <Temperature>
                {Math.round(temperature)}<span>°C</span>
            </Temperature>
            <ParameterWrapper>
                <Parameter
                    icon={<WindSpeedIcon />}
                    name="wind"
                    value={Math.round(windSpeed * 10) / 10}
                    unit="m/h"
                />
                <Parameter
                    icon={<HumidIcon />}
                    name="humid"
                    value={Math.round(humidity * 100)}
                    unit="%"
                />
                <Parameter
                    icon={<RainIcon />}
                    name="rain"
                    value={rainPossibility}
                    unit="%"
                />
            </ParameterWrapper>
            <ObservationTime>最後觀測時間：{observationTime}</ObservationTime>
            <Cog onClick={() => setCurrentPage('WeatherSetting')} />
            <Refresh onClick={fetchWeather} />
            {isLoading && (
                <LoadingWrapper>
                    <Loading />
                </LoadingWrapper>
            )}
        </Wrapper>
    );
};

export default WeatherCard;