import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showImagesByHomeId, showListImage} from "../service/imageService";
import {useNavigate, useParams} from "react-router-dom";
import {showHome} from "../service/homeService";
import './CSS/detail.css'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {format} from "date-fns";
import {DateRange} from "react-date-range";
import Swal from "sweetalert2";
import {createContract} from "../service/contractService";
import {checkHomesDays, createHomesDays} from "../service/homesDaysService";

const Detail = () => {

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
        return state.home.listHome
    })


    useEffect(() => {
        (async () => {
            await dispatch(showHome(id))
            await dispatch(showImagesByHomeId(id))
        })()
    }, [])

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
                        swalWithBootstrapButtons.fire('Successful', 'You have booked!', 'success', dispatch(createContract(data)), dispatch(createHomesDays(data)), navigate('/home'))
                    } else if (/* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', "You haven't booked yet!", 'error')
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Someone booked this day!',
                })
            }
        })
    }

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
        <div className="gray-simple pt-4">
            <div className="container-fluid container-fluid-tab"
                 style={{
                     backgroundColor: "transparent", display: "flex", float: "left",
                 }}>
                <div className="container" id="overview">
                    <div className="row" style={{background: "#fff", margin: "0", display: "flex"}}>
                        <div className="col-md-8" style={{boxSizing: "border-box", display: "block", width: "70%"}}>
                            <ul className="flex-tab" style={{width: "60%"}}>
                                <li><a href="" className="overview1 active_1-1"
                                       style={{color: "rgb(57, 70, 109)"}}>Overview</a></li>
                                <li><a href="" style={{color: "rgb(57, 70, 109)"}}>Photo library</a></li>
                                <li><a href="" style={{color: "rgb(57, 70, 109)"}}>Evaluate</a></li>
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
                                                    icon: 'error',
                                                    title: 'This is your home!',
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
                                                                icon: 'error',
                                                                title: "Can't choose this date!",
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
                    <div className="price">
                        <strong>From <small>{dataHome[0] && dataHome[0].price}<sup>$</sup> / Day</small></strong>
                    </div>
                </div>
                <div className="description">
                    <strong>Description</strong>
                    <p>{dataHome[0] && dataHome[0].description}</p>
                </div>
                <div className="storeImage" style={{marginTop: "20px"}}>
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
                {/*<div className="" style={{marginTop: "40px"}}>*/}
                {/*    <div className="property_block_wrap style-2 ">*/}
                {/*        <div className="property_block_wrap_header">*/}
                {/*            <a data-bs-toggle="collapse" data-parent="#cMap" data-bs-target="#cMap"*/}
                {/*               aria-controls="cMap" href="javascript:void(0);" aria-expanded="true">*/}
                {/*                <h4 id="maptab" className="property_block_title fit-h5 container_scroll">Map</h4>*/}
                {/*            </a>*/}
                {/*        </div>*/}
                {/*        <div id="cMap" className="panel-collapse collapse show">*/}
                {/*            <div className="block-body  fit-h5-img">*/}
                {/*                <iframe width="100%" height="400px"*/}
                {/*                        src="https://maps.google.com/maps?q=,20.922882921199644&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"></iframe>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="comment" style={{marginTop: "20px"}}>
                    <strong>Comment</strong>
                </div>
            </div>
        </div>
    </div>)
};

export default Detail;