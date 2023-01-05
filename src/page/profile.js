import './CSS/profile.css';
import {useDispatch, useSelector} from "react-redux";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {changePassword, updateProfile} from "../service/userService";
import * as Yup from "yup";
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "./firebase/config";

const InputSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(3, "Too Short!")
        .max(20, "Too Long")
        .required("Please Enter Your Name!"),
    job: Yup.string()
        .min(3, "Too Short!")
        .max(20, "Too Long")
        .required("Please Enter Your Job!"),
    address: Yup.string()
        .min(3, "Too Short!")
        .required("Please Enter Your Address!"),
    phone: Yup.string()
        .min(10, "Too Short!")
        .max(10, "Too Long")
        .required("Please Enter Your Phone!"),
    email: Yup.string()
        .min(3, "Too Short!")
        .email("Not an Email!")
        .required("Please Enter Your Email!"),
})

const InputSchema2 = Yup.object().shape({
    oldPassword: Yup.string()
        .required("Please Enter Old Password!"),
    newPassword: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long")
        .required("Please Enter New Password!"),
    repeatNewPassword: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long")
        .required("Please Enter New Password!"),
})

const Profile = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user = useSelector(state => {
        return state.user.userNow.user
    })

    let userId

    if (user) {
        userId = user.userFind[0].id;
    }
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        const promises = [];
        if (images.length > 0) {
            images.map((image) => {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                promises.push(uploadTask);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setUrls(prevState => [...prevState, downloadURLs])
                            console.log("File available at", downloadURLs);
                        });
                    }
                );
            });
        }
        Promise.all(promises)
            .then(() => Swal.fire({
                icon: 'success',
                title: "All images uploaded",
                showConfirmButton: false,
                timer: 1500
            }))
            .catch((err) => console.log(err));
    };
    const dispatch = useDispatch();
    return (
        <div style={{backgroundColor: "white", marginTop: '10px'}}>
            <div className="container">
                <div className="main-body"
                     style={{boxShadow: "0px 1px 25px 0px rgba(193,193,193,1)", borderRadius: "15px"}}>
                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">Your Profile</li>
                        </ol>
                    </nav>
                    <hr/>
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3" style={{width: "30%"}}>
                            <div className="card"
                                 style={{boxShadow: "0px 1px 5px 0px rgba(193,193,193,1)", borderRadius: "10px"}}>
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <label
                                            className="cursor-pointer flex items-center justify-center border border-dashed label-upload"
                                            style={{width: "200px"}}
                                        >
                                            <input type="file" name="" id="" className="hidden-input"
                                                   onChange={handleChange}/>

                                            <div className="img-upload">
                                                <img
                                                    src={user && user.userFind[0].avatar}
                                                    alt="Admin"
                                                    className="max-w-[100%] imgAvatar"
                                                />
                                            </div>
                                        </label>
                                        <button onClick={() => dispatch(handleUpload)}
                                                className="btn btn-info "
                                                style={{
                                                    marginTop: "20px",
                                                    backgroundColor: "#dc3545",
                                                    borderColor: "#dc3545",
                                                    color: "white",
                                                    borderRadius: "10px"
                                                }}>Upload
                                        </button>

                                        <div className="mt-3">
                                            <h4>{user && user.userFind[0].fullName}</h4>
                                            <p className="text-secondary mb-1">{user && user.userFind[0].job}</p>
                                            <p className="text-muted font-size-sm">{user && user.userFind[0].address}</p>
                                        </div>

                                        <Button variant="primary"
                                                style={{backgroundColor: "#dc3545", borderColor: "#dc3545"}}
                                                onClick={handleShow}>
                                            Change Password
                                        </Button>

                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Change Password</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Formik validationSchema={InputSchema2} initialValues={{
                                                    oldPassword: "",
                                                    newPassword: "",
                                                    repeatNewPassword: ""
                                                }}
                                                        onSubmit={async (values, {resetForm}) => {
                                                            if (values.newPassword !== values.repeatNewPassword) {
                                                                resetForm()
                                                                Swal.fire({
                                                                    title: 'Error!',
                                                                    text: 'New Password Repeat Wrong!',
                                                                    icon: 'error',
                                                                    confirmButtonText: 'Try Again'
                                                                })
                                                            } else {
                                                                let data = {
                                                                    id: userId,
                                                                    oldPassword: values.oldPassword,
                                                                    newPassword: values.newPassword
                                                                }
                                                                let check = await dispatch(changePassword(data))
                                                                console.log(check)
                                                                if (check.payload.user.check) {
                                                                    handleClose()
                                                                    resetForm()
                                                                    Swal.fire({
                                                                        icon: 'success',
                                                                        title: check.payload.mess,
                                                                        showConfirmButton: false,
                                                                        timer: 1500
                                                                    })
                                                                } else {
                                                                    resetForm()
                                                                    Swal.fire({
                                                                        title: 'Error!',
                                                                        text: check.payload.mess,
                                                                        icon: 'error',
                                                                        confirmButtonText: 'Try Again'
                                                                    })
                                                                }
                                                            }
                                                        }}>
                                                    <Form>
                                                        <Field
                                                            name="oldPassword"
                                                            type="text"
                                                            placeholder="Old Password"
                                                            style={{borderRadius: "10px"}}
                                                        />
                                                        <ErrorMessage name="oldPassword" component="div"
                                                                      style={{color: "red"}}></ErrorMessage>
                                                        <Field
                                                            name="newPassword"
                                                            type="text"
                                                            placeholder="New Password"
                                                            style={{marginTop: "10px", borderRadius: "10px"}}
                                                        />
                                                        <ErrorMessage name="newPassword" component="div"
                                                                      style={{color: "red"}}></ErrorMessage>
                                                        <Field
                                                            name="repeatNewPassword"
                                                            type="text"
                                                            placeholder="Repeat New Password"
                                                            style={{marginTop: "10px", borderRadius: "10px"}}
                                                        />
                                                        <ErrorMessage name="repeatNewPassword" component="div"
                                                                      style={{color: "red"}}></ErrorMessage>

                                                        <Modal.Footer>
                                                            <Button variant="secondary" style={{
                                                                backgroundColor: "#dc3545",
                                                                borderColor: "#dc3545"
                                                            }} onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                            <Button variant="primary" type={"submit"}>
                                                                Save Changes
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Form>
                                                </Formik>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8" style={{width: "70%",}}>
                            <div className="card mb-3"
                                 style={{boxShadow: "0px 1px 5px 0px rgba(193,193,193,1)", borderRadius: "10px"}}>
                                <div className="card-body">
                                    <Formik validationSchema={InputSchema} initialValues={{
                                        fullName: "",
                                        job: "",
                                        phone: "",
                                        address: "",
                                        email: "",
                                        avatar: urls[urls.length - 1]
                                    }} onSubmit={(values) => {
                                        let data = {
                                            id: userId,
                                            newFullName: values.fullName,
                                            newJob: values.job,
                                            newPhone: values.phone,
                                            newAddress: values.address,
                                            newEmail: values.email,
                                            newAvatar: urls[urls.length - 1]
                                        }
                                        dispatch(updateProfile(data))
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Updated!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    }}>
                                        <Form>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0" style={{color: "red"}}>Full Name</h6>
                                                </div>
                                                <Field className="col-sm-8 text-secondary" name="fullName"
                                                       style={{borderRadius: "10px"}}
                                                       placeholder={user && user.userFind[0].fullName}>
                                                </Field>
                                                <ErrorMessage name="fullName" component="div"
                                                              style={{color: "red"}}></ErrorMessage>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0" style={{color: "red"}}>Job</h6>
                                                </div>
                                                <Field className="col-sm-8 text-secondary" name="job"
                                                       style={{borderRadius: "10px"}}
                                                       placeholder={user && user.userFind[0].job}>
                                                </Field>
                                                <ErrorMessage name="job" component="div"
                                                              style={{color: "red"}}></ErrorMessage>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0" style={{color: "red"}}>Phone</h6>
                                                </div>
                                                <Field type="number" className="col-sm-8 text-secondary" name="phone"
                                                       style={{borderRadius: "10px"}}
                                                       placeholder={user && user.userFind[0].phone}>
                                                </Field>
                                                <ErrorMessage name="phone" component="div"
                                                              style={{color: "red"}}></ErrorMessage>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0" style={{color: "red"}}>Address</h6>
                                                </div>
                                                <Field className="col-sm-8 text-secondary" name="address"
                                                       style={{borderRadius: "10px"}}
                                                       placeholder={user && user.userFind[0].address}>
                                                </Field>
                                                <ErrorMessage name="address" component="div"
                                                              style={{color: "red"}}></ErrorMessage>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0" style={{color: "red"}}>Email</h6>
                                                </div>
                                                <Field className="col-sm-8 text-secondary" name="email"
                                                       style={{borderRadius: "10px"}}
                                                       placeholder={user && user.userFind[0].email}>
                                                </Field>
                                                <ErrorMessage name="email" component="div"
                                                              style={{color: "red"}}></ErrorMessage>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <button className="btn btn-info "
                                                            style={{
                                                                backgroundColor: "#dc3545",
                                                                borderColor: "#dc3545",
                                                                color: "white",
                                                                borderRadius: "10px"
                                                            }}>Update
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile