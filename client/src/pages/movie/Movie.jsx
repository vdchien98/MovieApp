import './Movie.scss';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Button from '../../components/button/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ListMovie from '../../components/listMovie/ListMovie';
import { getEpisodes } from '../../redux/episodeRedux/apiCalls';
import { useDispatch } from 'react-redux';

export default function Movie() {
    const { slug } = useParams();
    const movie = useSelector((state) => {
        return state.movie.movies.find((movie) => movie.slug === slug);
    });
    const dispatch = useDispatch();
    useEffect(() => {
        getEpisodes(movie._id, dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const episodes = useSelector((state) => {
        return state.episode.episodes;
    });
    const [checkLines, setCheckLines] = useState(0);
    const [check, setCheck] = useState(true);
    const [tabWrapper, setTabWrapper] = useState('1');

    useEffect(() => {
        const el = document.getElementById('desc');
        const divHeight = el.offsetHeight;
        setCheckLines(divHeight / 24);
    }, []);
    const handleMore = () => {
        if (check) {
            document.getElementById('descBox').classList.remove('desc');
            setCheck(false);
        } else {
            document.getElementById('descBox').classList.add('desc');
            setCheck(true);
        }
    };
    const handleTab = (e) => {
        setTabWrapper(e.target.dataset.foo);
    };
    return (
        <>
            <InfoMovie>
                <Banner>
                    <div>
                        <div>
                            <Link to={'/'} style={{ backgroundImage: `url(${movie.imgBanner})` }} />
                            <div className="bottom"></div>
                            <div className="left"></div>
                        </div>
                        <div>
                            <Link to={'/'} style={{ backgroundImage: `url(${movie.imgBanner})` }} />
                            <div className="bottom"></div>
                        </div>
                    </div>
                </Banner>
                <Content>
                    <div>
                        <h2>{movie.title}</h2>
                        {movie.isVip && (
                            <Vip className="mt10">
                                <div>Vip</div>
                            </Vip>
                        )}

                        <Type className="mt10">
                            {movie.genre.map((genre, index) => {
                                return (
                                    <Link to={'/'} key={index}>
                                        {genre}
                                    </Link>
                                );
                            })}
                        </Type>
                        <Info>
                            <div className="mt10">
                                <span>
                                    Năm phát hành: <Link to={'/'}>{movie.year}</Link>
                                </span>
                            </div>
                            <div className="mt10">
                                <span>
                                    Quốc gia: <Link to={'/'}>{movie.country}</Link>
                                </span>
                            </div>
                            <div className="mt10">
                                <span>
                                    Đạo diễn:{' '}
                                    {movie.director.map((director, index) => {
                                        return (
                                            <Link to={'/'} key={index}>
                                                {`${director}, `}
                                            </Link>
                                        );
                                    })}
                                </span>
                            </div>
                            <div className="mt10">
                                <span>
                                    Diễn viên:{' '}
                                    {movie.actor.slice(0, 4).map((actor, index) => {
                                        return (
                                            <Link to={'/'} key={index}>
                                                {`${actor}, `}
                                            </Link>
                                        );
                                    })}
                                </span>
                            </div>
                            <div className="mt10 desc" id="descBox">
                                <span>
                                    Miêu tả: <span id="desc">{movie.desc}</span>
                                </span>
                            </div>
                            {checkLines >= 3 && (
                                <div className="mt10 more">
                                    <span onClick={handleMore}>
                                        {check ? 'Hiển thị thêm' : 'Thu gọn giới thiệu'}
                                        {check ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                                    </span>
                                </div>
                            )}
                        </Info>
                        <Buttons>
                            <Button>
                                <PlayArrowIcon /> Phát ngay
                            </Button>
                            <Button>Thêm vào lưu trữ</Button>
                        </Buttons>
                    </div>
                </Content>
            </InfoMovie>
            <TabWrapper>
                <div>
                    {movie.isSeries && (
                        <div onClick={handleTab} data-foo="1" className={tabWrapper === '1' ? 'active' : ''}>
                            Chọn tập
                        </div>
                    )}
                    <div onClick={handleTab} data-foo="2" className={tabWrapper === '2' || !movie.isSeries ? 'active' : ''}>
                        Đề xuất cho bạn
                    </div>
                </div>
                <div></div>
                {tabWrapper === '1' ? (
                    <ListEpisode>
                        {episodes.map((episode, index) => {
                            return (
                                <div key={index}>
                                    <Link to={'/'} title={movie.title}>
                                        <div>
                                            <div style={{ backgroundImage: `url(${movie.imgBanner})` }} alt="" className="imgItem"></div>
                                        </div>
                                        <h3>{movie.title + ' Tập ' + episode.title}</h3>
                                    </Link>
                                </div>
                            );
                        })}
                    </ListEpisode>
                ) : (
                    ''
                )}
                {tabWrapper === '2' || !movie.isSeries ? <ListMovie /> : ''}
            </TabWrapper>
        </>
    );
}

const InfoMovie = styled.div`
    margin-left: 4rem;
    @media screen and (max-width: 1023px) {
        margin-left: 0;
    }
    position: relative;
    a {
        cursor: pointer;
        &:hover {
            color: var(--primary-color);
        }
    }
`;
const Banner = styled.div`
    position: relative;
    z-index: 90;
    & > div {
        position: relative;
        &:before {
            content: '';
            display: block;
            padding-top: 39.8%;
        }
        & > div {
            position: absolute;
            opacity: 0.95;
            height: 100%;
            cursor: pointer;
            top: 0px;
            right: 0px;
            width: 70%;
            & > a {
                display: block;
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: 100%;
            }
        }
        & > div:nth-child(2) {
            display: none;
            width: 100%;
        }
        @media screen and (max-width: 1023px) {
            & > div:nth-child(1) {
                display: none;
            }
            & > div:nth-child(2) {
                display: block;
            }
        }
    }
`;
const Content = styled.div`
    display: flex;
    width: 60%;
    font-size: 1rem;
    margin-top: -30%;
    & > div {
        z-index: 99;
        h2 {
            font-size: 2rem;
            text-align: left;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: normal;
            text-shadow: rgb(0 0 0 / 70%) 1px 1px 0px;
        }
        .mt10 {
            margin: 10px 0;
        }
    }
    @media screen and (max-width: 1023px) {
        margin-top: 0;
        width: 100%;
        padding: 0 4rem;
    }
`;
const Vip = styled.div`
    & > div {
        background: rgb(242, 191, 131);
        color: rgb(17, 19, 25);
        display: inline-block;
        border-radius: 2px;
        text-align: center;
        letter-spacing: 0px;
        font-weight: 700;
        padding: 2px;
    }
`;
const Type = styled.div`
    & > a {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 2px;
        font-weight: 600;
        padding: 2px 6px;
        margin-right: 10px;
        font-size: 0.75rem;
    }
`;
const Info = styled.div`
    a {
        color: var(--white);
        font-weight: 600;
        line-height: 1.5rem;
        letter-spacing: 1px;
    }
    span {
        color: rgb(169, 169, 172);
        font-weight: 600;
        line-height: 1.5rem;
        letter-spacing: 1px;
        span {
            color: var(--white);
        }
    }
    .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    #descBox {
        & > span {
            display: block;
            text-align: justify;
        }
    }
    .more {
        position: relative;
        span {
            position: absolute;
            right: 10px;
            color: var(--primary-color);
            display: flex;
        }
        cursor: pointer;
        &:hover {
            span {
                color: rgb(73, 210, 109);
            }
        }
    }
`;
const Buttons = styled.div`
    margin-top: 50px;
    display: flex;
    & > button {
        margin-right: 20px;
        display: inline-flex;
        background: rgb(45, 47, 52);
        text-align: center;
        &:hover {
            background: rgb(86, 87, 91);
        }
    }
    & > button:nth-child(1) {
        &:hover {
            background: rgb(73, 210, 109);
        }
        background-color: var(--primary-color);
    }
`;
const TabWrapper = styled.div`
    margin: 2rem 3rem 2rem 4rem;
    & > div:nth-child(1) {
        display: flex;
        & > div {
            margin-right: 40px;
            padding: 16px 0;
            font-weight: 600;
            cursor: pointer;
        }
        .active {
            border-bottom: 4px solid rgb(28, 199, 73);
        }
    }
    & > div:nth-child(2) {
        opacity: 0.15;
        height: 1px;
        background-color: rgb(255, 255, 255);
        margin-right: 1rem;
    }
`;
const ListEpisode = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;

    & > div {
        width: 25%;
        margin-bottom: 1rem;
        & > a {
            & > div {
                overflow: hidden;
                margin-bottom: 1rem;
                margin-right: 1rem;
                & > div {
                    width: 100%;
                    object-fit: cover;
                    transition: all 0.3s ease-in-out 0s;
                    background-repeat: no-repeat;
                    padding-top: 60%;
                    display: block;
                    height: 100%;
                    background-size: 100%;
                }
            }
            & > h3 {
                transition: all 0.3s ease-in-out 0s;
                font-size: 0.9rem;
            }
        }
        &:hover .imgItem {
            transform: scale(1.1);
        }
        &:hover h3 {
            color: var(--primary-color);
        }
    }
`;
