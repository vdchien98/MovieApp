import { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MovieBox = styled.div`
    position: relative;
    margin: 0 0.5rem;
    & > a {
        & > div {
            overflow: hidden;
            margin-bottom: 1rem;
            border-radius: 6px;
            & > div {
                width: 100%;
                object-fit: cover;
                transition: all 0.3s ease-in-out 0s;
                border-radius: 6px;
                background-repeat: no-repeat;
                background-size: cover;
                padding-top: 150%;
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
`;

const MovieItem = (props) => {
    return (
        <>
            <MovieBox>
                <Link to={'/movie/' + props.movie.slug} title={props.movie.title}>
                    <div>
                        <div style={{ backgroundImage: `url(${props.movie.imgTitle})` }} alt="" className="imgItem"></div>
                    </div>
                    <h3>{props.movie.title}</h3>
                </Link>
            </MovieBox>
        </>
    );
};
export default memo(MovieItem);
