import styled from 'styled-components'
import React from 'react'

const Container = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({ theme }) => theme.textSoft};
`
const Hr = () => {
    return (
        <Container />
    )
}

export default Hr