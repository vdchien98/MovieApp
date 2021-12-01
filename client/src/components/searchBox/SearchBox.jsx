import { useState, memo } from 'react';
import '../../assets/css/style.scss';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';

const Search = styled.div`
    @media screen and (max-width: 1023px) {
        display: none;
    }
    width: 264px;
    cursor: pointer;
    & > div {
        position: relative;
        display: flex;
        width: 100%;
        height: 36px;
        border-radius: 4px;
        box-sizing: border-box;
        z-index: 1;
    }
`;
const SearchForm = styled.div`
    width: 100%;
    position: relative;
    input {
        width: 264px;
        height: 36px;
        padding: 0px 70px 0px 15px;
        box-sizing: border-box;
        border-radius: 4px;
        display: block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.15);
        font-size: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        outline: none;
        color: var(--white);

        &:focus {
            background: rgb(255 255 255 / 66%);
            color: #000;
        }
    }
    & > div {
        position: absolute;
        right: 11px;
        top: 5px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .line {
        position: absolute;
        right: 44px;
        top: 9px;
        width: 1px;
        height: 16px;
        background: rgba(255, 255, 255, 0.1);
    }
    .clear {
        position: absolute;
        right: 53px;
        top: 10px;
        width: 16px;
        height: 16px;
        background-color: var(--white);
        border-radius: 50%;
        color: #ccc;
    }
`;

const SearchBox = (props) => {
    const [input, setInput] = useState('');
    const handleChange = (e) => {
        setInput(e.target.value);
    };
    return (
        <Search className={props.className}>
            <div>
                <SearchForm>
                    <input placeholder="Search" onChange={handleChange} type="text" id="search" />
                    <div>
                        <SearchIcon />
                    </div>
                    <span className="line"></span>
                    {input !== '' ? (
                        <ClearIcon
                            className="clear"
                            onClick={() => {
                                document.getElementById('search').value = '';
                                setInput('');
                            }}
                        />
                    ) : (
                        ''
                    )}
                </SearchForm>
            </div>
        </Search>
    );
};
export default memo(SearchBox);
