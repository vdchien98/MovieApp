import { useState, memo, useCallback } from 'react';
import '../../assets/css/style.scss';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from '@material-ui/core';
import Input from '../input/Input';
import styled from 'styled-components';
import { login } from '../../redux/authRedux/apiCalls';
import { useDispatch } from 'react-redux';

const FormModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Mask = styled.div`
    position: fixed;
    z-index: 100001;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
`;
const Paper = styled.div`
    width: 400px;
    z-index: 100002;
    background-color: var(--white);
    border-radius: 8px;
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 20%);
    .paper-header {
        padding: 12px 12px 4px;
        display: flex;
        justify-content: space-between;
        & > svg {
            cursor: pointer;
        }
    }
    height: auto;
    overflow: hidden;
`;
const PaperContent = styled.div`
    padding: 0 40px 40px;
    overflow-y: scroll;
    overflow-y: overlay;
    max-height: 350px;
    & > div {
        margin: 10px 0;
    }
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
        width: 5px;
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #e2dbdb;
    }
    & > span {
        margin: 0 30px;
        color: red;
    }
    .title {
        p {
            font-size: 1.125rem;
            color: #222;
            letter-spacing: 0;
            font-weight: 700;
            text-align: center;
            line-height: 1.75rem;
            margin: 0;
        }
    }
    button {
        color: var(--white);
        background: var(--primary-color);
        &:hover {
            opacity: 0.7;
        }
    }
    div {
        button {
            height: 30px;
            width: 30px;
        }
    }
    .options {
        margin: 20px 0 0;
        span {
            color: #222;
            letter-spacing: 0;
            text-align: center;
            line-height: 1rem;
            color: #00c234;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 600;
            text-align: center;
            display: inline-block;
            margin: 0 40px;
            &:hover {
                opacity: 0.7;
            }
        }
    }
`;
const Modal = (props) => {
    const [switchModal, setSwitchModal] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();
    const handleChange = useCallback((e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);
    const [status, setStatus] = useState();
    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            ...inputs,
        };
        login(dispatch, data).then((response) => {
            if (response._id) {
                props.setOpenModal(false);
            } else {
                setStatus('Tài khoản mật khẩu không chính xác !!!');
            }
        });
    };

    return (
        <FormModal>
            <Paper>
                {switchModal === 'login' && (
                    <>
                        <div className="paper-header">
                            <div></div>
                            <ClearIcon
                                onClick={() => {
                                    props.setOpenModal(false);
                                }}
                            />
                        </div>
                        <PaperContent>
                            <div className="title">
                                <p>Đăng nhập</p>
                            </div>
                            <span>{status}</span>
                            <Input name="username" label="User Name" type="text" onChange={handleChange} />
                            <Input
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                handleShowPassword={handleShowPassword}
                                onChange={handleChange}
                            />
                            <Button fullWidth onClick={handleLogin}>
                                Đăng nhập
                            </Button>
                            <div className="options">
                                <span
                                    onClick={() => {
                                        setSwitchModal('register');
                                    }}
                                >
                                    Đăng ký
                                </span>
                                <span
                                    onClick={() => {
                                        setSwitchModal('forgotPassword');
                                    }}
                                >
                                    Quên mật khẩu
                                </span>
                            </div>
                        </PaperContent>
                    </>
                )}
                {switchModal === 'register' && (
                    <>
                        <div className="paper-header">
                            <ArrowBackIosIcon
                                onClick={() => {
                                    setSwitchModal('login');
                                }}
                            />
                            <ClearIcon
                                onClick={() => {
                                    props.setOpenModal(false);
                                }}
                            />
                        </div>
                        <PaperContent>
                            <div className="title">
                                <p>Đăng ký</p>
                            </div>
                            <Input name="username" label="User Name" type="text" />
                            <Input name="email" label="Email" type="email" />
                            <Input
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                handleShowPassword={handleShowPassword}
                            />
                            <Input
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                handleShowPassword={handleShowPassword}
                            />
                            <Button fullWidth>Đăng ký</Button>
                        </PaperContent>
                    </>
                )}
                {switchModal === 'forgotPassword' && (
                    <>
                        <div className="paper-header">
                            <ArrowBackIosIcon
                                onClick={() => {
                                    setSwitchModal('login');
                                }}
                            />
                            <ClearIcon
                                onClick={() => {
                                    props.setOpenModal(false);
                                }}
                            />
                        </div>
                        <PaperContent>
                            <div className="title">
                                <p>Tìm lại mật khẩu</p>
                            </div>
                            <Input name="email" label="Email" type="email" />
                            <Button fullWidth>Tiếp</Button>
                        </PaperContent>
                    </>
                )}
            </Paper>
            <Mask></Mask>
        </FormModal>
    );
};
export default memo(Modal);
