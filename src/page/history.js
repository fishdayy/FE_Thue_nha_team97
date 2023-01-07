import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeContract, showContractsByUserId} from "../service/contractService";
import {removeHomesDays} from "../service/homesDaysService";
import Swal from "sweetalert2";

const History = () => {

    const dispatch = useDispatch();

    let contracts = useSelector(state => {
        return state.contract.listContract;
    })

    let user = useSelector(state => {
        return state.user.userNow.user.userFind[0]
    })

    useEffect(() => {
        (async () => {
            await dispatch(showContractsByUserId(user.id))
        })()
    }, [contracts])

    return (<div>
        <div className="row">
            <h2 style={{textAlign: "center"}}>Trips</h2>
            <p style={{textAlign: "center"}}>Time to dust off your bags and start planning your next adventure</p>
        </div>
        <div style={{backgroundColor: "white", marginTop: '10px'}}>
            <div className="container">
                <div className="main-body"
                     style={{boxShadow: "0px 1px 25px 0px rgba(193,193,193,1)", borderRadius: "15px"}}>
                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">Previous Rental History</li>
                        </ol>
                    </nav>
                    <hr/>
                    <div className="">
                        <div className="card"
                             style={{boxShadow: "0px 1px 5px 0px rgba(193,193,193,1)", borderRadius: "10px"}}>
                            <div className="card-body" style={{maxWidth: "100%"}}>
                                <div className="d-flex flex-column text-center">
                                    <table className="table">
                                        <thead>
                                        <tr className="table-danger">
                                            <th className="table-danger">Home's Name</th>
                                            <th className="table-danger">Your Name</th>
                                            <th className="table-danger">Time Start</th>
                                            <th className="table-danger">Time End</th>
                                            <th className="table-danger">Total Price</th>
                                            <th className="table-danger"></th>
                                        </tr>
                                        </thead>
                                        <tbody className="table-group-striped">
                                        {contracts.map(item => (<tr className="align-bottom">
                                            <td className="">{item.name}</td>
                                            <td className="">{user.fullName}</td>
                                            <td className="">{item.timeStart}</td>
                                            <td className="">{item.timeEnd}</td>
                                            <td className="">{item.totalPrice}</td>
                                            <td className="">
                                                <button className="btn btn-danger" type="submit" onClick={() => {
                                                    let today = new Date()
                                                    let time = new Date(new Date(item.timeStart).setDate(new Date(item.timeStart).getDate() - 1))
                                                    if (today >= time) {
                                                        Swal.fire({
                                                            icon: 'error',
                                                            title: "Can't cancel!",
                                                            text: 'Because the start time is only one day left',
                                                        })
                                                    } else {
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
                                                            confirmButtonText: 'Yes, delete it!',
                                                            cancelButtonText: 'No, cancel!  ',
                                                            reverseButtons: true
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success', dispatch(removeContract(item.id)).then((res) => {
                                                                    dispatch(removeHomesDays(res.payload.idContract))
                                                                }))
                                                            } else if (/* Read more about handling dismissals below */
                                                                result.dismiss === Swal.DismissReason.cancel) {
                                                                swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error')
                                                            }
                                                        })
                                                    }
                                                }}>Cancel
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
            </div>
        </div>
    </div>);
};

export default History;