import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showContractsByUserCreate, showIncome} from "../service/contractService";
import {Field, Form, Formik} from "formik";

const HomeRental = () => {

    const dispatch = useDispatch();

    let contracts = useSelector(state => {
        return state.contract.listContract;
    })

    let income = useSelector(state => {
        if (state.contract.income[0] && state.contract.income[0].income == null) return 0;
        return state.contract.income[0];
    })

    let user = useSelector(state => {
        return state.user.userNow.user.userFind[0]
    })

    useEffect(() => {
        (async () => {
            await dispatch(showContractsByUserCreate(user.id))
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
                            <li className="breadcrumb-item active" aria-current="page">Home Rental history</li>
                        </ol>
                    </nav>
                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                        <h5>Income</h5>
                        <Formik initialValues={{
                            monthFind: "", yearFind: ""
                        }} onSubmit={(values) => {
                            let data = {
                                id: user.id,
                                "timeFind": values.yearFind + "-" + values.monthFind
                            }
                            dispatch(showIncome(data))
                        }}>
                            <Form>
                                <label style={{marginRight: "10px"}}><strong>Month</strong></label>
                                <Field as={"select"} style={{marginRight: "40px"}} name={"monthFind"}>
                                    <option value={""}>Month</option>
                                    <option value={"1"}>1</option>
                                    <option value={"2"}>2</option>
                                    <option value={"3"}>3</option>
                                    <option value={"4"}>4</option>
                                    <option value={"5"}>5</option>
                                    <option value={"6"}>6</option>
                                    <option value={"7"}>7</option>
                                    <option value={"8"}>8</option>
                                    <option value={"9"}>9</option>
                                    <option value={"10"}>10</option>
                                    <option value={"11"}>11</option>
                                    <option value={"12"}>12</option>
                                </Field>
                                <label style={{marginRight: "10px"}}><strong>Year</strong></label>

                                <Field style={{marginBottom: "10px"}} as={"select"} name={"yearFind"}>
                                    <option value={""} disabled selected>Year</option>
                                    <option value={"2023"}>2023</option>
                                    <option value={"2024"}>2024</option>
                                    <option value={"2025"}>2025</option>
                                    <option value={"2026"}>2026</option>
                                    <option value={"2027"}>2027</option>
                                    <option value={"2028"}>2028</option>
                                    <option value={"2029"}>2029</option>
                                    <option value={"2030"}>2030</option>
                                    <option value={"2031"}>2031</option>
                                    <option value={"2032"}>2032</option>
                                    <option value={"2033"}>2033</option>
                                    <option value={"2034"}>2034</option>
                                </Field><br/>
                                <label className="submit" style={{marginBottom: "10px"}}>
                                    <button className="btn btn-danger" type="submit">Submit</button>
                                </label>
                            </Form>
                        </Formik>
                    </nav>
                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                        <label className="breadcrumb-item active"
                               aria-current="page"><strong> Total:</strong> {income && income.income}<strong>$</strong></label>
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
                                            <th className="table-danger">Customer's Name</th>
                                            <th className="table-danger">Time Start</th>
                                            <th className="table-danger">Time End</th>
                                            <th className="table-danger">Total Price</th>
                                        </tr>
                                        </thead>
                                        <tbody className="table-group-striped">
                                        {contracts.map(item => (<tr className="align-bottom">
                                            <td className="">{item.name}</td>
                                            <td className="">{item.fullName}</td>
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

export default HomeRental;
