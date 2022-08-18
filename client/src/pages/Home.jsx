import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card';
import axios from "axios"

const Container = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
flex-wrap:wrap;
gap:10px;

@media screen and (max-width:810px){
 justify-content:center;   
}
`;
const Home = ({ type }) => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/${type}`)
            setVideos(res.data)
        }
        fetchVideos()
    }, [type])

    return (
        <Container>
            {videos.map(video => (
                <Card key={video._id} video={video} />
            ))}
        </Container>
    )
}

export default Home