import React, { useState } from 'react';
import styled from '@emotion/styled';
import { locationList } from '../constants';
import history from '../history';

const Wrapper = styled.div`
    position: relative;
    box-sizing: border-box;
    min-width: 360px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor};

    @media(max-width: 414px) {
        box-shadow: none;
    }
`;

const Title = styled.h1`
    margin-bottom: 28px;
    text-align: center;
    font-size: 28px;
    color: ${({ theme }) => theme.titleColor};
`;

const Label = styled.label`
    display: block;
    margin-bottom: 15px;
    font-size: 16px;
    color: ${({ theme }) => theme.textColor};
`;

const Select = styled.select`
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    padding: 7px 10px;
    border: 1px solid ${({ theme }) => theme.textColor};
    border-radius: 3px;
    outline: none;
    margin-bottom: 40px;
    font-size: 16px;
    color: ${({ theme }) => theme.textColor}
    background: transparent;
    cursor: pointer;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 35px;
        border: 1px solid transparent;
        border-radius: 3px;
        margin: 0;
        line-height: 1;
        letter-spacing: 0.3px;
        white-space: nowrap;
        cursor: pointer;
        overflow: visible;
        text-transform: none;
        background-color: transparent;
        user-select: none;

        &:focus, &.focus {
          outline: 0;
          box-shadow: none;
        }
    }
`;

const BackButton = styled.button`
    && {
        border-color: ${({ theme }) => theme.textColor};
        color: ${({ theme }) => theme.textColor};
    }
`;

const SaveButton = styled.button`
    && {
        color: white;
        background-color: #40a9f3;
    }
`;

const cityList = locationList.map(({ cityName }) => cityName);

const WeatherSetting = ({ cityName, setCurrentCity }) => {
    const [locationName, setLocationName] = useState(cityName);

    const handleChange = e => {
        setLocationName(e.target.value);
    };

    const handleSave = () => {
        if (cityList.includes(locationName)) {
            setCurrentCity(locationName);
            history.push(`${process.env.PUBLIC_URL}/`);
        } else {
            alert('Location not found.');
        }
    };

    return (
        <Wrapper>
            <Title>設定</Title>
            <Label htmlFor="location">地區</Label>
            <Select
                id="location"
                name="location"
                onChange={handleChange}
                value={locationName}
            >
                {cityList.map(cityName => (
                    <option key={cityName} value={cityName}>{cityName}</option>
                ))}
            </Select>
            <ButtonGroup>
                <BackButton onClick={() => history.push(`${process.env.PUBLIC_URL}/`)}>返回</BackButton>
                <SaveButton onClick={handleSave}>儲存</SaveButton>
            </ButtonGroup>
        </Wrapper>
    );
};

export default WeatherSetting;