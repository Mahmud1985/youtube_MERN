import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import Comments from '../components/Comments';
import Hr from '../components/widgets/Hr';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { sub } from '../redux/userSlice';
import Recommendation from "../components/Recommendation";

const Container = styled.div`
display:flex;
gap:24px;
`;

const Content = styled.div`
flex:5;
`;

const VideoWrapper = styled.div`
height:50vh;
width:100%;
`;

const Title = styled.h1`
    font-size:18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom:10px;
    color: ${({ theme }) => theme.text};

    @media screen and (max-width:810px){
        margin-left: 20px;
    }
`;

const Detailes = styled.div`
/* position:relative; */
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width:810px){
        margin: 10px;
        gap:10px;
        flex-direction:column;
    }
`;
const Info = styled.span`
    color:${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
display: flex;
flex-wrap: wrap;
gap:20px;
color:${({ theme }) => theme.text};

`;
const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap:5px;
cursor:pointer;
`;

const Channel = styled.div`
    display: flex;
    justify-content: space-between;
    
    @media screen and (max-width:810px){
        margin-left: 20px;
    }
    `;
const ChannelInfo = styled.div`
display: flex;
gap: 20px;
`;
const Image = styled.img`
    flex:1;
    width: 50px;
    height: 50px;
    margin: 10px 20px;
    border-radius:50%;
`;
const ChannelDetail = styled.div`
flex:12;
display: flex;
flex-direction:column;
color:${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
font-weight: 500;
`;
const ChannelCounter = styled.span`
margin-top: 5px;
margin-bottom: 20px;
color:${({ theme }) => theme.textSoft};
font-size: 12px;
`;
const Description = styled.p`
font-size: 14px;
`;
const Subscribe = styled.button`
background-color:#cc1a00;
font-weight: 500;
color:white;
border:none;
border-radius:3px;
height:max-content;
padding: 10px 20px;
cursor:pointer;
`;

const ResInfo = styled.div`
/* position: absolute; 
top:30px;
right:auto;
left:auto;*/
text-align:center;
color:${({ theme }) => theme.text};`

const VideoFreame = styled.video`
    max-height:720px;
    height:100%;
    width:100%;
    object-fit: cover;
`

const Video = () => {
    const { currentUser } = useSelector((state) => state.user)
    const { currentVideo } = useSelector((state) => state.video)
    const dispatch = useDispatch();

    const path = useLocation().pathname.split("/")[2];
    //console.log(path)
    const [channel, setChannel] = useState({})

    const [resInfo, setResInfo] = useState("")

    useEffect(() => {
        setTimeout(() => { setResInfo(null) }, 1500)
    }, [resInfo])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(`/videos/find/${path}`)
                //console.log("video response : ", videoRes.data)
                const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)
                setChannel(channelRes.data)
                dispatch(fetchSuccess(videoRes.data))
            } catch (error) {

            }
        }
        fetchData()
    }, [path, dispatch])

    const handleLike = async () => {
        const res = await axios.put(`/users/like/${currentVideo._id}`)
        dispatch(like(currentUser._id))
        setResInfo(res.data)
    }
    const handleDislike = async () => {
        const res = await axios.put(`/users/dislike/${currentVideo._id}`)
        dispatch(dislike(currentUser._id))
        setResInfo(res.data)
    }

    const handleSubscription = async () => {
        const res = await axios.put(`/users/sub/${channel._id}`)
        dispatch(sub(channel._id))
        setResInfo(res.data)
    }

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <iframe width="100%" height="100%" src={currentVideo?.videoUrl} title={currentVideo?.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    {/* <VideoFreame src={currentVideo?.videoUrl} controls /> */}
                </VideoWrapper>
                <Title>{currentVideo?.title}</Title>
                <Detailes>
                    <Info> {currentVideo?.views} views • {format(currentVideo?.createdAt)}</Info>
                    {resInfo && <ResInfo>{resInfo}</ResInfo>}
                    <Buttons>
                        <Button onClick={handleLike}>{currentVideo?.likes.includes(currentUser?._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}{currentVideo?.likes?.length}</Button>
                        <Button onClick={handleDislike}>{currentVideo?.dislikes.includes(currentUser?._id) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />}Dislike</Button>
                        <Button><ReplyOutlinedIcon />Share</Button>
                        <Button><AddTaskOutlinedIcon />Save</Button>
                    </Buttons>
                </Detailes>
                <Hr />
                <Channel>
                    <ChannelInfo>
                        <Image src={channel?.img} />
                        <ChannelDetail>
                            <ChannelName>{channel?.name}</ChannelName>
                            <ChannelCounter>{channel?.subscribers} Subscribers</ChannelCounter>
                            <Description>{currentVideo?.desc}</Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe onClick={handleSubscription}>{currentUser?.subscribedUsers.includes(channel?._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>
                </Channel>
                <Hr />
                <Comments videoId={currentVideo._id} />
            </Content>
            <Recommendation tags={currentVideo.tags} />
        </Container>
    )
}

export default Video