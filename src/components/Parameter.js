import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;

    svg {
        width: 25px;
        height: 25px;
        margin-bottom: 10px;
    }
`;

const Name = styled.p`
    margin-bottom: 6px;
    font-size: 12px;
    color: ${({ theme }) => theme.textColor};
    text-transform: uppercase;
`;

const Value = styled.p`
    margin-bottom: 4px;
    font-size: 24px;
    color: ${({ theme }) => theme.textColor};
`;

const Unit = styled.p`
    font-size: 14px;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};
`;

const Parameter = ({ icon, name, value, unit }) => {
    return (
        <Wrapper>
            {icon}
            <Name>{name}</Name>
            <Value>{value}</Value>
            <Unit>{unit}</Unit>
        </Wrapper>
    );
};

export default Parameter;