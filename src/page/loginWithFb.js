import React from 'react';
import FacebookLogin from "react-facebook-login";
import {useDispatch} from "react-redux";
import {loginFB} from "../service/userService";
import {useNavigate} from "react-router-dom";
import './CSS/login.css'

const LoginWithFb = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const responseFacebook = async (response) => {
        let dataFb = {
            username: response && response.name,
            password: response && response.id
        }
        let checkLogin = await dispatch(loginFB(dataFb))
        if (checkLogin.payload.mess === "Sai tên tài khoản hoặc mật khẩu") {
            alert("Login information is incorrect")
        } else {
            alert('Logged in successfully')
            navigate('/home')
        }
    }

    const componentClicked = (data) => {
    }

    return (
        <div>
            <FacebookLogin
                appId="417928700477727"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} />
        </div>
    );
};

export default LoginWithFb;