import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {register} from "../service/userService";
import {Link, useNavigate} from "react-router-dom";
import './CSS/login.css';
import * as Yup from "yup";
import Swal from "sweetalert2";

const InputSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("Please Enter Username!"),
    password: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("Please Enter Password!"),
    repeatPassword: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("Please Enter Repeat Password!"),
})

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleRegister = async (values) => {

        if (values.password !== values.repeatPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Password Repeat Wrong!',
                icon: 'error',
                confirmButtonText: 'Try Again'
            })
        } else {
            let data = {
                username: values.username, password: values.password
            }
            let registerMess = await dispatch(register(data))
            checkRepeatUser(registerMess)
        }
    }
    const checkRepeatUser = (registerMess) => {
        if (registerMess.payload.mess == 'Tài khoản đã tồn tại') {
            Swal.fire({
                title: 'Error!',
                text: 'Account already exists',
                icon: 'error',
                confirmButtonText: 'Try Again'
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Successful account registration',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/')
        }
    }
    return (<div>
        <div className="veen" id="background" style={{borderRadius: "10px"}}>
            <div className="wrapper" style={{borderRadius: "10px"}}>
                <Formik
                    validationSchema={InputSchema}
                    initialValues={{
                        username: "", password: "", repeatPassword: ""
                    }}
                    onSubmit={(values, {resetForm}) => {
                        handleRegister(values)
                        resetForm()
                    }}
                >
                    <Form id="login" tabIndex="500">
                        <h3>Register</h3>
                        <div className="mail" style={{display: "flex"}}>
                            <Field name={'username'} type="text" style={{borderRadius: "10px"}}/>
                            <ErrorMessage name="username" component="div" style={{color: "red"}}></ErrorMessage>
                            <label>Mail or Username</label>
                        </div>
                        <div className="passwd" style={{display: "flex"}}>
                            <Field name={'password'} type="password" style={{borderRadius: "10px"}}/>
                            <ErrorMessage name="password" component="div" style={{color: "red"}}></ErrorMessage>
                            <label>Password</label>
                        </div>
                        <div className="passwd" style={{display: "flex"}}>
                            <Field name={'repeatPassword'} type="password" style={{borderRadius: "10px"}}/>
                            <ErrorMessage name="repeatPassword" component="div" style={{color: "red"}}></ErrorMessage>
                            <label>Repeat Password</label>
                        </div>
                        <div className="submit">
                            <button className="dark" id="registerButton" type={'submit'}>Submit</button>
                        </div>
                    </Form>
                </Formik>
                <div className="submit">
                    <p style={{marginBottom: "20px", marginTop: "10px"}}>Already an user?</p>
                    <Link to={'/'}>
                        <button className="dark" id="loginButton">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>);
};

export default Register;