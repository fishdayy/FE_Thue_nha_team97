import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeHome, showYourHomes} from "../service/homeService";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import Modal from "react-bootstrap/Modal";
import {format} from "date-fns";
import {DateRange} from "react-date-range";
import Button from "react-bootstrap/Button";
import {checkHomesDays, createHomesDays, removeHomesDays2} from "../service/homesDaysService";
import {createRepairTime, removeRepairTime, showByHomeId} from "../service/repairTimesService";

const YourHomes = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [openDate, setOpenDate] = useState(false)
    const [homeId, setHomeId] = useState()
    const [date, setDate] = useState([{
        startDate: new Date(), endDate: new Date(), key: "selection"
    }]);

    const Swal = require('sweetalert2')

    let dataHome = useSelector(state => {
        return state.home.listHome
    })

    let userId = useSelector(state => {
        return state.user.userNow.user.userFind[0].id
    })
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(showYourHomes(userId))
        })()
    }, [])

    const repairTimes = useSelector(state => {
        return state.repairTimes.listRepairTime
    })

    const repairHome = () => {

        let data = {
            homeId: homeId,
            userId: userId,
            timeStart: `${date[0].startDate.getFullYear() + '-' + (date[0].startDate.getMonth() + 1) + '-' + date[0].startDate.getDate()}`,
            timeEnd: `${date[0].endDate.getFullYear() + '-' + (date[0].endDate.getMonth() + 1) + '-' + date[0].endDate.getDate()}`
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
                   <strong>To: </strong> ${date[0].endDate.getFullYear() + '-' + (date[0].endDate.getMonth() + 1) + '-' + date[0].endDate.getDate()}`,
                    title: 'Are you sure repaired?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, repaired!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire('Successful', 'You have repaired!', 'success',
                            dispatch(createRepairTime(data)).then((res) => {
                                let idRepairTime = res.payload.idRepairTimes
                                let newData = {...data, idRepairTime}
                                dispatch(createHomesDays(newData))
                            }),
                            handleClose()
                        )
                    } else if (/* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', "You haven't repaired yet!", 'error', handleClose())
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Can't repair!",
                    text: 'Someone set this date or the house is under repair!'
                })
            }
        })
    }

    return (<div>
        <div>
            <h2 style={{textAlign: "center", marginBottom: "20px", marginTop: "20px", color: "#dc3545"}}>Manage your
                home information</h2>
            <p style={{textAlign: "center", marginBottom: "30px"}}>Please update housing information accurately so that
                customers have the best experience at your home.</p>

        </div>
        <div className="row">
            <div className="col-12">
                <div className="row p-3">
                    {dataHome.map(item => (<div className="col-3">
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <Link to={`/home/detail/${item.id}`}>
                                        <img className="d-block w-100" src={item.avatar} style={{
                                            width: "322px", height: "306px", borderRadius: "20px"
                                        }}
                                             alt="First slide"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div style={{marginBottom:"6px"}}>
                            <strong style={{textAlign: "left"}}>{item.name}</strong>
                            <p style={{fontWeight: "200", textAlign: "left", marginBottom: "0"}}>{item.address}</p>
                            <strong style={{textAlign: "left"}}>{item.price}$<label
                                style={{fontWeight: "200", marginLeft: "10px"}}>/ Day</label></strong>
                        </div>
                        <div>
                            <button onClick={() => {
                                const swalWithBootstrapButtons = Swal.mixin({
                                    customClass: {
                                        confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger'
                                    }, buttonsStyling: false
                                })
                                swalWithBootstrapButtons.fire({
                                    title: 'Are you sure?',
                                    text: "You won't be able to revert this!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes, delete it!',
                                    cancelButtonText: 'No, cancel!  ',
                                    reverseButtons: true
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success', dispatch(removeHome(item.id)))
                                    } else if (/* Read more about handling dismissals below */
                                        result.dismiss === Swal.DismissReason.cancel) {
                                        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error')
                                    }
                                })
                            }} className="btn btn-info "
                                    style={{
                                        backgroundColor: "#dc3545",
                                        color: "white",
                                        borderRadius: "10px",
                                        marginRight: "10px",
                                        borderColor: "#dc3545"
                                    }}><i className="fa-solid fa-trash-can"></i>
                            </button>
                            <Link to={`/home/edit/${item.id}`}>
                                <button className="btn btn-info "
                                        style={{
                                            backgroundColor: "#dc3545",
                                            color: "white",
                                            borderRadius: "10px",
                                            borderColor: "#dc3545"
                                        }}><i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            </Link>
                            <button onClick={() => {
                                setHomeId(item.id)
                                handleShow()
                                setOpenDate(false)
                            }} className="btn btn-info "
                                    style={{
                                        backgroundColor: "#dc3545",
                                        color: "white",
                                        borderRadius: "10px",
                                        borderColor: "#dc3545",
                                        marginLeft: "10px"
                                    }}><i className="fa-solid fa-screwdriver-wrench"></i>
                            </button>
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
                                                    onClick={() => repairHome()}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal.Body>
                                </div>
                            </Modal>
                            <button onClick={() => {
                                dispatch(showByHomeId(item.id))
                                handleShow2()
                            }} className="btn btn-info "
                                    style={{
                                        backgroundColor: "#dc3545",
                                        color: "white",
                                        borderRadius: "10px",
                                        marginLeft: "10px",
                                        borderColor: "#dc3545"
                                    }}><i className="fa-solid fa-arrows-rotate"></i>
                            </button>
                            <Modal show={show2} onHide={handleClose2}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Change Status</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div style={{backgroundColor: "white", marginTop: '10px'}}>
                                        <div className="container">
                                            <div className="main-body"
                                                 style={{
                                                     boxShadow: "0px 1px 25px 0px rgba(193,193,193,1)",
                                                     borderRadius: "15px"
                                                 }}>
                                                <div className="card-body" style={{maxWidth: "100%"}}>
                                                    <div className="d-flex flex-column text-center">
                                                        <table className="table">
                                                            <thead>
                                                            <tr className="table-danger">
                                                                <th className="table-danger">Time Start</th>
                                                                <th className="table-danger">Time End</th>
                                                                <th className="table-danger"></th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="table-group-striped">
                                                            {repairTimes.map(item2 => (
                                                                <tr className="align-bottom">
                                                                    <td className="">{item2.timeStart}</td>
                                                                    <td className="">{item2.timeEnd}</td>
                                                                    <td className="">
                                                                        <button onClick={() => {
                                                                            const swalWithBootstrapButtons = Swal.mixin({
                                                                                customClass: {
                                                                                    confirmButton: 'btn btn-success',
                                                                                    cancelButton: 'btn btn-danger'
                                                                                }, buttonsStyling: false
                                                                            })
                                                                            swalWithBootstrapButtons.fire({
                                                                                title: 'Are you sure?',
                                                                                text: "You won't be able to revert this!",
                                                                                icon: 'warning',
                                                                                showCancelButton: true,
                                                                                confirmButtonText: 'Yes, change!',
                                                                                cancelButtonText: 'No, cancel!  ',
                                                                                reverseButtons: true
                                                                            }).then((result) => {
                                                                                if (result.isConfirmed) {
                                                                                    swalWithBootstrapButtons.fire('Changed!', 'Status has been changed', 'success', dispatch(removeRepairTime(item2.id)).then((res) => {
                                                                                        dispatch(removeHomesDays2(res.payload.idRepairTime))
                                                                                        handleClose2()
                                                                                    }))
                                                                                } else if (/* Read more about handling dismissals below */
                                                                                    result.dismiss === Swal.DismissReason.cancel) {
                                                                                    swalWithBootstrapButtons.fire('Canceled!', 'Status is preserved', 'error')
                                                                                    handleClose2()
                                                                                }
                                                                            })
                                                                        }} className="btn btn-danger"
                                                                                type="submit"
                                                                        >Repair done
                                                                        </button>
                                                                    </td>
                                                                </tr>))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>))}
                </div>
            </div>
        </div>
    </div>)
};

export default YourHomes;