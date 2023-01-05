import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showContractsByUserId} from "../service/contractService";

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
    }, [])

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
                                            </tr>
                                            </thead>
                                            <tbody className="table-group-striped">
                                            {contracts.map(item => (<tr className="align-bottom">
                                                    <td className="">{item.name}</td>
                                                    <td className="">{user.fullName}</td>
                                                    <td className="">{item.timeStart}</td>
                                                    <td className="">{item.timeEnd}</td>
                                                    <td className="">{item.totalPrice}</td>
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