import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../service/userService";
import './CSS/login.css';
import * as Yup from "yup";
import LoginWithFb from "./loginWithFb";
import Swal from 'sweetalert2'

const InputSchema = Yup.object().shape({
    username: Yup.string()
        .required("Please Enter Username!"),
    password: Yup.string()
        .required("Please Enter Password!"),
})

const Login = () => {

    const Swal = require('sweetalert2')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async (values) => {
            let dataLogin = await dispatch(login(values))
            checkLogin(dataLogin)
    }

    const checkLogin = (dataLogin) => {
        if (dataLogin.payload.mess === 'Sai tên tài khoản hoặc mật khẩu') {
            Swal.fire({
                title: 'Error!',
                text: 'Login information is incorrect',
                icon: 'error',
                confirmButtonText: 'Try Again'
            })
            localStorage.clear()
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Logged in successfully',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                clearTimeout()
                navigate('/home')
            }, 1500)
        }
    }

    return (<>
        <div className="veen" id="background" style={{borderRadius:"10px"}}>
            <div className="wrapper" style={{borderRadius:"10px"}}>
                <Formik
                    validationSchema={InputSchema}
                    initialValues={{
                        username: "", password: ""
                    }}
                    onSubmit={(values, {resetForm}) => {
                        handleLogin(values)
                        resetForm()
                    }}>
                    <Form id="login" tabIndex="500" >
                        <h3 >Login</h3>
                        <div className="mail" style={{display: "flex"}}>
                            <Field type="text" name={'username'} style={{borderRadius:"12px"}}/>
                            <ErrorMessage name="username" component="div" style={{color: "red",fontSize:"10px"}}></ErrorMessage>
                            <label>Mail or Username</label>
                        </div>
                        <div className="passwd" style={{display: "flex"}}>
                            <Field name={'password'} type="password" style={{borderRadius:"10px"}}/>
                            <ErrorMessage name="password" component="div" style={{color: "red",fontSize:"10px"}}></ErrorMessage>
                            <label>Password</label>
                        </div>
                        <div className="submit">
                            <button id="loginButton" className="dark">Login</button>
                        </div>
                    </Form>
                </Formik>
                {/*<div>*/}
                {/*    <LoginWithFb></LoginWithFb>*/}
                {/*</div>*/}
                <div className="submit">
                    <p style={{marginBottom:"10px",marginTop:"10px"}}>Don't have an account?</p>
                    <Link to={'/register'}>
                        <button id="registerButton" className="dark">Register</button>
                    </Link>
                </div>
            </div>
        </div>
    </>)
}
export default Login;