import { useState, useEffect } from 'react';
import '../../assets/css/style.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Modal from '../modal/Modal';
import MobileModal from '../mobileModal/MobileModal';
import SearchBox from '../searchBox/SearchBox';
import { Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './topBar.scss';
import styled from 'styled-components';
import logo from './logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authRedux/apiCalls';
const NavBar = styled.div`
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 200;
    top: 0px;
    vertical-align: middle;
    background-image: linear-gradient(0deg, rgba(51, 51, 51, 0) 0%, rgba(51, 51, 51, 0.75) 100%);
    transition: background-color 0.5s linear 0s;
    .container {
        justify-content: flex-end;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    & > div:nth-child(1) {
        height: 100%;
    }
    @media screen and (max-width: 767px) {
        height: 40px;
    }
`;
const MobileMenu = styled.div`
    display: none;
    height: 100%;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
    & > svg {
        width: 40px;
        height: 40px;
    }
    @media screen and (max-width: 1023px) {
        display: flex;
    }
    @media screen and (max-width: 767px) {
        & > svg {
            width: 30px;
            height: 30px;
        }
    }
`;
const Logo = styled.div`
    font-size: 0px;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    a {
        margin: auto 0px;
        img {
            width: 40px;
            height: 32px;
        }
    }
    @media screen and (max-width: 767px) {
        height: 40px;
        a {
            img {
                width: 30px;
                height: 24px;
            }
        }
    }
`;
const LeftBar = styled.div`
    height: 100%;
    flex: 1;
    & > div {
        display: flex;
        height: 100%;
        align-items: flex-end;
    }
    @media screen and (max-width: 1023px) {
        display: none;
    }
`;
const RightBar = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    & > div:nth-child(1) {
        display: none;

        &:hover {
            opacity: 0.7;
        }
    }
    @media screen and (max-width: 1023px) {
        flex: 1;
        justify-content: flex-end;
        & > div:nth-child(1) {
            display: inline-block;
            width: 32px;
            height: 30px;
            margin-top: 2px;
            border: 1 px solid rgba(255, 255, 255, 0.25);
            border-radius: 50%;
            background: url('//www.iqiyipic.com/common/fix/global/search@2x.png') center center / 60% 60% no-repeat rgba(0, 0, 0, 0.2);
        }
    }
`;
const Chanel = styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
    position: relative;
    &:hover .list {
        display: flex;
    }
    .header-item {
        text-decoration: none;
        opacity: 0.7;
        font-size: 1rem;
        line-height: 1.5rem;
        height: 41px;
        cursor: pointer;
    }
    .header-item:hover {
        opacity: 1;
    }
    span {
        width: 100%;
        height: 3px;
        background: var(--primary-color);
        display: none;
        margin-top: 14px;
    }
    .header-item:hover span.selected {
        display: block;
    }
`;
const UserBox = styled.div`
    margin-left: 16px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    & > svg {
        height: 31px;
        width: 31px;
        opacity: 0.9;
        &:hover {
            opacity: 1;
        }
    }
    span {
        font-size: 0.875rem;
    }
    &:hover .list {
        display: flex;
        width: 150px;
        left: 0;
        &:before {
            left: 65%;
        }
    }
    position: relative;
    @media screen and (max-width: 1023px) {
        display: none;
    }
`;
const List = styled.ul`
    display: none;
    list-style: none;
    margin: 0;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%);
    border-radius: 4px;
    background: rgb(26, 28, 34);
    border: 1px solid rgba(255, 255, 255, 0.25);
    padding: 0px 1rem;
    box-sizing: border-box;
    width: 234px;
    flex-direction: row;
    flex-wrap: wrap;
    & li {
        padding: 10px 0;
        text-align: center;
        line-height: 24px;
        font-size: 14px;
        width: 100px;
        display: block;
        &:hover span.selected {
            display: block;
        }
    }
    & a {
        text-decoration: none;
    }
    &:after {
        content: '';
        width: 100%;
        height: 10px;
        background-color: transparent;
        top: -10px;
        position: absolute;
        right: 0;
        z-index: -2;
    }
    &:before {
        display: block;
        box-sizing: border-box;
        content: '';
        height: 12px;
        width: 12px;
        position: absolute;
        z-index: -1;
        top: -1px;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        background-color: rgb(26, 28, 34);
        border-left: 1 px solid rgba(255, 255, 255, 0.25);
        border-top: 1 px solid rgba(255, 255, 255, 0.25);
        border-radius: 4px 0px 0px;
    }
`;
export default function TopBar() {
    window.addEventListener('scroll', () => {
        var scroll = window.scrollY;
        if (scroll >= 100) {
            document.getElementById('navBar').classList.add('navBar');
        } else {
            document.getElementById('navBar').classList.remove('navBar');
        }
    });
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [openMobileModal, setOpenMobileModal] = useState(false);
    const [openSearchBox, setOpenSearchBox] = useState(false);
    const handleOpenSearchBox = () => {
        setOpenSearchBox(!openSearchBox);
    };
    useEffect(() => {
        if (openModal || openMobileModal) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [openModal, openMobileModal]);
    const handleLogout = () => {
        logout(dispatch);
    };
    return (
        <>
            <NavBar id="navBar" className={openSearchBox ? 'navBar' : ''}>
                <div className="container" style={openSearchBox ? { justifyContent: 'center' } : {}}>
                    {!openSearchBox ? (
                        <>
                            <MobileMenu>
                                <MenuIcon
                                    onClick={() => {
                                        setOpenMobileModal(true);
                                    }}
                                />
                            </MobileMenu>
                            <Logo>
                                <a href="/">
                                    <img src={logo} className="App-logo" alt="logo" />
                                </a>
                            </Logo>
                            <LeftBar>
                                <div>
                                    <Chanel>
                                        <a href="/" className="header-item">
                                            Đề Xuất
                                            <span className="selected"></span>
                                        </a>
                                    </Chanel>
                                    <Chanel>
                                        <a href="/" className="header-item">
                                            Phim Lẻ
                                            <span className="selected"></span>
                                        </a>
                                    </Chanel>
                                    <Chanel>
                                        <a href="/" className="header-item">
                                            Phim bộ
                                            <span className="selected"></span>
                                        </a>
                                    </Chanel>
                                    <Chanel>
                                        <div className="header-item">Thể loại</div>
                                    </Chanel>
                                    <Chanel>
                                        <div className="header-item">Quốc gia</div>
                                    </Chanel>
                                    <Chanel>
                                        <div className="header-item">Năm phát hành</div>
                                        <List className="list">
                                            <li>
                                                <a href="/">2021</a>
                                                <span className="selected"></span>
                                            </li>
                                            <li>
                                                <a href="/">2021</a>
                                            </li>
                                            <li>
                                                <a href="/">2021</a>
                                            </li>
                                            <li>
                                                <a href="/">2021</a>
                                            </li>
                                            <li>
                                                <a href="/">2021</a>
                                            </li>
                                            <li>
                                                <a href="/">2021</a>
                                            </li>
                                            <li>
                                                <a href="/">2021</a>
                                            </li>
                                        </List>
                                    </Chanel>
                                </div>
                            </LeftBar>
                            <RightBar>
                                <div onClick={handleOpenSearchBox}></div>
                                <SearchBox />
                                <UserBox>
                                    {auth.status === 'Login' ? (
                                        <>
                                            <div>
                                                <img src={auth.currentUser.img} alt="" className="topAvatar" />
                                                <List className="list">
                                                    <li>
                                                        <span>{auth.currentUser.fullName}</span>
                                                    </li>
                                                    <li>
                                                        <a href="/">Setting</a>
                                                    </li>
                                                    <li onClick={handleLogout}>
                                                        <span>Đăng Xuất</span>
                                                    </li>
                                                </List>
                                            </div>
                                        </>
                                    ) : (
                                        <AccountCircleIcon
                                            onClick={() => {
                                                setOpenModal(true);
                                            }}
                                        />
                                    )}
                                </UserBox>
                            </RightBar>
                        </>
                    ) : (
                        <div style={{ alignItems: 'center', display: 'flex', height: '60px' }}>
                            <SearchBox className="searchBoxMobile" />
                            <Button onClick={handleOpenSearchBox} style={{ color: 'white' }}>
                                Huy
                            </Button>
                        </div>
                    )}
                </div>
                {openMobileModal && <MobileModal setOpenMobileModal={setOpenMobileModal} setOpenModal={setOpenModal} />}
                {openModal && <Modal setOpenModal={setOpenModal} />}
            </NavBar>
        </>
    );
}
