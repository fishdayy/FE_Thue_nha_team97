import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showImagesByHomeId, showListImage} from "../service/imageService";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {showHome, showStar} from "../service/homeService";
import './CSS/detail.css'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {format} from "date-fns";
import {DateRange} from "react-date-range";
import Swal from "sweetalert2";
import {createContract} from "../service/contractService";
import {checkHomesDays, createHomesDays} from "../service/homesDaysService";
import GoogleMapReact from "google-map-react";
import icons from "./icon";
import {createComment, showComment} from "../service/commentService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {Avatar} from "@mui/material";
import "../page/CSS/comment.css"
import axios from "axios";
import mapboxgl from "mapbox-gl";
import {createNotification} from "../service/notificationService";

const InputSchema = Yup.object().shape({
    comment: Yup.string()
        .required("Please Enter Comment!"),
})

const Detail = () => {

    //GG map
    const {HiLocationMarker} = icons;
    const AnyReactComponent = ({text}) => <div>{text}</div>;
    let address = useSelector(state => {
        return state.home.detailHome[0]
    })
    const [coords, setCoords] = useState(null);

    mapboxgl.accessToken = 'pk.eyJ1Ijoibmd1eWVuY2FvMTk5NyIsImEiOiJjbGNxeXIzaW8wN2lpM25wMGZidHk2MXN2In0.B2tk71Q9h4cWLRplq4tmJw';

    const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);

    useEffect(() => {
        axios
            .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address && address.address}.json?access_token=pk.eyJ1Ijoibmd1eWVuY2FvMTk5NyIsImEiOiJjbGNxeXIzaW8wN2lpM25wMGZidHk2MXN2In0.B2tk71Q9h4cWLRplq4tmJw`)
            .then(res => {
                setLat(res.data.features[0].center[1])
                setLng(res.data.features[0].center[0])
                setCoords({lat: res.data.features[0].center[1], lng: res.data.features[0].center[0]})
            })
    }, [address])

    //End map
    const Swal = require('sweetalert2')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([{
        startDate: new Date(), endDate: new Date(), key: "selection"
    }]);

    const dispatch = useDispatch()

    const navigate = useNavigate()

    let {id} = useParams()

    let userId = useSelector(state => {
        return state.user.userNow.user.userFind[0].id
    })

    let user = useSelector(state => {
        return state.user.userNow.user.userFind[0]
    })

    let dataImage = useSelector(state => {
        return state.image.listImage
    })

    let dataHome = useSelector(state => {
        return state.home.detailHome
    })

    let comment = useSelector(state => {
        return state.comment.listComment
    })

    useEffect(() => {
        (async () => {
            await dispatch(showHome(id))
            await dispatch(showImagesByHomeId(id))
            await dispatch(showComment(id))
        })()
    }, [comment.length])

    const getNumberRentDay = () => {
        const get_day_of_time = (d1, d2) => {
            let ms1 = d1.getTime();
            let ms2 = d2.getTime();
            return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
        };

        let data = {
            homeId: id,
            userId: userId,
            timeStart: `${date[0].startDate.getFullYear() + '-' + (date[0].startDate.getMonth() + 1) + '-' + date[0].startDate.getDate()}`,
            timeEnd: `${date[0].endDate.getFullYear() + '-' + (date[0].endDate.getMonth() + 1) + '-' + date[0].endDate.getDate()}`,
            totalPrice: (get_day_of_time(date[0].startDate, date[0].endDate) + 1) * (dataHome[0] && dataHome[0].price)
        }

        dispatch(checkHomesDays(data)).then((res) => {
            if (res.payload.check) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger'
                    }, buttonsStyling: false
                })
                swalWithBootstrapButtons.fire({
                    html: `<div><strong>From:</strong>  ${date[0].startDate.getFullYear() + '-' + (date[0].startDate.getMonth() + 1) + '-' + date[0].startDate.getDate()}
                   <strong>To: </strong> ${date[0].endDate.getFullYear() + '-' + (date[0].endDate.getMonth() + 1) + '-' + date[0].endDate.getDate()}<br/>
                   <strong>Price:</strong> ${(get_day_of_time(date[0].startDate, date[0].endDate) + 1) * (dataHome[0] && dataHome[0].price)} $</div>`,
                    title: 'Are you sure booking?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, booking!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire('Successful', 'You have booked!', 'success', dispatch(createContract(data)).then((res) => {
                            let idContract = res.payload.idContract
                            let newData = {...data, idContract}
                            dispatch(createHomesDays(newData))
                            let today = new Date()
                            let time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' / ' + today.getHours() + 'h' + today.getMinutes() + 'm' + today.getSeconds() + 's'
                            let dataNotification = {
                                homeId: dataHome[0] && dataHome[0].id, username: user.username, content: "Rented", time: time
                            }
                            dispatch(createNotification(dataNotification))
                        }), navigate('/home'))
                    } else if (/* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', "You haven't booked yet!", 'error')
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error', title: "Can't booking!", text: 'Someone set this date or the house is under repair!'
                })
            }
        })
    }

    const [star, setStar] = React.useState(0);

    return (<div>
        <div className="row" id="imageDetail" style={{display: "flex"}}>
            <div style={{float: "left"}} className="col-12">

                {dataImage.slice(0, 3).map((item, index) => {
                    return (<img src={item.image} className="col-4"
                                 width="100%" height="278px"
                    />)
                })}
            </div>
        </div>
        <div className="pt-4">
            <div className="container-fluid container-fluid-tab"
                 style={{
                     backgroundColor: "transparent", display: "flex", float: "left",
                 }}>
                <div className="container" id="overview">
                    <div className="row" style={{
                        boxShadow: "0px 1px 25px 0px rgba(193,193,193,1)", borderRadius: "10px", display: "flex"
                    }}>
                        <div className="col-md-8" style={{boxSizing: "border-box", display: "block", width: "70%"}}>
                            <ul className="flex-tab" style={{width: "60%"}}>
                                <li><a style={{color: "rgb(57, 70, 109)"}}>Overview</a></li>
                                <li><a href="#photoLibrary" style={{color: "rgb(57, 70, 109)"}}>Photo library</a>
                                </li>
                                <li><a href="#evaluate" style={{color: "rgb(57, 70, 109)"}}>Evaluate</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4" style={{width: "30%"}}>
                            <div className="flex-tab-color-price">
                                <strong>From <small>{dataHome[0] && dataHome[0].price}<sup>$</sup> /
                                    Day</small></strong>
                                <Button variant="primary"
                                        style={{backgroundColor: "#dc3545", borderColor: "#dc3545"}}
                                        onClick={() => {
                                            if (dataHome[0] && dataHome[0].userId === userId) {
                                                Swal.fire({
                                                    icon: 'error', title: 'This is your home!',
                                                })
                                            } else {
                                                if (user.fullName === 'Your Name') {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Please update your profile!',
                                                        showConfirmButton: false,
                                                        timer: 2000
                                                    })
                                                    setTimeout(() => {
                                                        clearTimeout()
                                                        navigate('/home/profile')
                                                    }, 2000)
                                                } else {
                                                    handleShow()
                                                }
                                            }
                                        }}>
                                    Booking
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Choose Date</Modal.Title>
                                    </Modal.Header>
                                    <div style={{float: "left"}}>
                                        <Modal.Body>
                                            <div style={{
                                                display: "flex",
                                                width: "100%",
                                                height: "50px",
                                                alignItems: "center",
                                                border: "1px solid",
                                                marginRight: "1%",
                                                borderRadius: "5px"
                                            }}>
                                                <i className="fa-solid fa-calendar-days"
                                                   style={{padding: "0 10px"}}></i>
                                                <span onClick={() => setOpenDate(!openDate)} className="text-search"
                                                      style={{marginRight: "10px"}}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>

                                                {openDate && <DateRange
                                                    editableDateInputs={true}
                                                    onChange={(item) => {
                                                        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
                                                        if (item.selection.startDate >= yesterday) {
                                                            setDate([item.selection])
                                                        } else {
                                                            Swal.fire({
                                                                icon: 'error', title: "Can't choose this date!",
                                                            })
                                                        }
                                                    }}
                                                    moveRangeOnFirstSelection={false}
                                                    ranges={date}
                                                    className="date2"
                                                />}
                                            </div>
                                            <Modal.Footer>
                                                <Button variant="secondary"
                                                        style={{backgroundColor: "#dc3545", borderColor: "#dc3545"}}
                                                        onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" type={"submit"}
                                                        onClick={() => getNumberRentDay()}>
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal.Body>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <h3>{dataHome[0] && dataHome[0].name}</h3>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <i className="fa-solid fa-location-pin" style={{color: "black", padding: "0 13px"}}></i>
                        <div className="nav-link-strong">
                            <p style={{color: "black"}}>
                                {dataHome[0] && dataHome[0].address}
                            </p>
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <i className="fa-solid fa-home" style={{color: "black", padding: "0 10px"}}></i>
                        <div className="nav-link-strong">
                            <p style={{color: "black"}}>
                                {dataHome[0] && dataHome[0].category}
                            </p>
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <i className="fa-solid fa-sink" style={{color: "black", padding: "0 10px"}}></i>
                        <div className="nav-link-strong">
                            <p style={{color: "black"}}>
                                {dataHome[0] && dataHome[0].bathroom} Bathroom
                            </p>
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <i className="fa-solid fa-bed" style={{color: "black", padding: "0 8px"}}></i>
                        <div className="nav-link-strong">
                            <p style={{color: "black"}}>
                                {dataHome[0] && dataHome[0].bedroom} Bedroom
                            </p>
                        </div>
                    </div>
                    <div>
                        <strong>Average rating :</strong> {dataHome[0] && dataHome[0].star}
                        <i className="fa fa-star text-warning"></i></div>
                    <div className="price">
                        <strong>From <small>{dataHome[0] && dataHome[0].price}<sup>$</sup> / Day</small></strong>
                    </div>

                </div>
                <div className="description">
                    <strong>Description</strong>
                    <p>{dataHome[0] && dataHome[0].description}</p>
                </div>
                <div className="storeImage" style={{marginTop: "20px"}} id="photoLibrary">
                    <div className="row">
                        <strong className="col-12">Photo Library</strong>
                    </div>
                    <div className="row">
                        <div className="col-12" style={{display: "flex", flexWrap: "wrap"}}>
                            {dataImage.map(image => (
                                <div className="col-3" style={{marginRight: "10px", marginBottom: "10px"}}>
                                    <img className="" src={image.image}
                                         style={{width: "100%", height: "100%"}}
                                         alt="First slide"/>
                                </div>))}
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{height: '500px', width: '100%'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: process.env.REACT_APP_MAP_API}}
                            defaultCenter={coords}
                            defaultZoom={11}
                            center={coords}
                        >
                            <AnyReactComponent
                                lat={coords?.lat}
                                lng={coords?.lng}
                                text={<HiLocationMarker color={"red"} size={24}/>}
                            />
                        </GoogleMapReact>
                    </div>
                </div>
                <>
                    <div className="">
                        <div className="row">
                            <div className="col-12" style={{marginTop: "20px"}}>
                                <div className="col-2">
                                    <strong id="evaluate">Evaluate</strong>
                                </div>
                                <div className="col-12" style={{display: "flex"}}>
                                    <div className="col-2" style={{width: "130px"}}>
                                        <img src={user.avatar} className="rounded-circle mt-2 "
                                             style={{height: "100px", width: "100px"}}/>
                                    </div>
                                    <div className="col-10">
                                        <div className="comment-box ml-2">
                                            <div className="rating">
                                                <Typography component="legend"></Typography>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={star}
                                                    onChange={(event, newValue) => {
                                                        if (newValue === null) {
                                                            setStar(0)
                                                        } else {
                                                            setStar(newValue);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <Formik validationSchema={InputSchema} initialValues={{
                                                userId: user.id, homeId: id, comment: ""
                                            }} onSubmit={(values, {resetForm}) => {
                                                let data = {
                                                    homeId: id, userId: user.id, comment: values.comment, star: star
                                                }
                                                dispatch(createComment(data)).then((res) => {
                                                    dispatch(showStar(res.payload.comment.homeId))
                                                })

                                                let today = new Date()
                                                let time = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' / ' + today.getHours() + 'h' + today.getMinutes() + 'm' + today.getSeconds() + 's'
                                                let dataNotification = {
                                                    homeId: dataHome[0] && dataHome[0].id,
                                                    username: user.username,
                                                    content: "Commented",
                                                    time: time
                                                }
                                                dispatch(createNotification(dataNotification))
                                                resetForm()
                                            }}>
                                                <Form>

                                                    <div className="comment-area">
                                                        <Field name={'comment'} type={'text'}
                                                               style={{resize: "none", width: "50%"}}
                                                               className="form-control"
                                                               placeholder="what is your view?"
                                                               rows="4"></Field>
                                                        <ErrorMessage name="comment" component="div"
                                                                      style={{color: "red"}}></ErrorMessage>
                                                    </div>
                                                    <div className="comment-btns mt-2">
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <div className="pull-right">
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        type="submit">Send <i
                                                                        className="fa fa-long-arrow-right ml-1"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
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
                    {comment && comment.map(item => (<div className="border-bottom p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="user d-flex flex-row align-items-center">
                                <Avatar alt="Remy Sharp" src={item.avatar} style={{marginRight: "10px"}}/>
                                <span><small
                                    className="font-weight-bold text-primary">{item.username}</small> <small
                                    className="font-weight-bold">{item.comment}</small></span><br/>
                            </div>
                            <div className="action d-flex justify-content-between mt-2 align-items-center">
                                <div>
                                    <Typography component="legend"></Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={item.star}
                                    />
                                </div>
                                <i className="fa fa-check-circle-o check-icon"></i>
                            </div>
                        </div>
                    </div>))}
                </>
            </div>
        </div>
    </div>)
};

export default Detail;