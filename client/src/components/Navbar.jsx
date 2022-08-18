import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoCallOutLinedIcon from "@mui/icons-material/VideoCallOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';

import React, { useState } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../redux/userSlice";
import Upload from "./Upload";

const Container = styled.div`
position:sticky;
top:0;
background-color: ${({ theme }) => theme.bgLighter};
height:56px;

`;

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
height:100%;
padding: 0px 20px;
`;

const Search = styled.div`
width:40%;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border:1px solid #ccc;
border-radius:3px;
color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
width:100%;
border:none;
outline: none;
color: ${({ theme }) => theme.text};
background-color: transparent;
`;

const Button = styled.button`

padding:5px 15px;
background-color: transparent;
border:1px solid #3ea6ff;
color:#3ea6ff;
border-radius: 3px;
font-weight: 500;
cursor: pointer;
display: flex;
align-items: center;
gap:5px;
`;

const BurgerMenu = styled.div`
 display:none;
@media screen and (max-width:810px) {
   display:flex;
flex-direction:column;
align-items: center;
justify-content: center;
gap:5px;
cursor: pointer;

}
`;
const MenuLine = styled.div`
width:30px;
border:3px solid ${({ theme }) => theme.text};
color:${({ theme }) => theme.text};
`;

const User = styled.div`
    display: flex;
    align-items:center;
    gap:10px;
    font-weight: 500;
    color:${({ theme }) => theme.text};
`
const Avatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius:50%;
    background-color: #999;
`

const Navbar = ({ burger, setBurger }) => {

    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const handleSignout = async () => {
        try {
            dispatch(logout())
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <BurgerMenu onClick={() => setBurger(!burger)}>
                        <MenuLine></MenuLine>
                        <MenuLine></MenuLine>
                        <MenuLine></MenuLine>
                    </BurgerMenu>
                    <Search>
                        <Input placeholder="Search" />
                        <SearchOutlinedIcon />
                    </Search>
                    {currentUser ?
                        <User>
                            <VideoCallOutLinedIcon style={{ "cursor": "pointer" }} onClick={() => setOpen(true)} />
                            <Avatar src={currentUser?.img} />
                            {currentUser?.name}
                            <Button onClick={handleSignout}>
                                <LogoutIcon />
                                SIGN OUT
                            </Button>
                        </User>
                        : <Link to="signin" style={{ textDecoration: "none" }}>
                            <Button>
                                <AccountCircleOutlinedIcon />
                                SIGN IN
                            </Button>
                        </Link>}
                </Wrapper>
            </Container>
            {open && <Upload setOpen={setOpen} />}
        </>
    )
}

export default Navbar