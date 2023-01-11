import NavBar from "../components/NavBar";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showNotifications} from "../service/notificationService";

const Notification = () => {

    const  dispatch = useDispatch()

    const notifications = useSelector(state => {
        return state.notification.listNotification
    })
    let user = useSelector(state => {
        return state.user.userNow.user.userFind[0]
    })

    useEffect(() => {
        (async () => {
            await dispatch(showNotifications(user.id))
        })()
    }, [])

    return (
        <>
            <div style={{marginBottom: "50px"}}>
                <NavBar></NavBar>
            </div>
            <div className="row">
                <h2 style={{textAlign: "center",color:"rgb(220 53 69)"}}>Feedback</h2>
                <p style={{textAlign: "center"}}>Serve customers with all your heart.</p>
            </div>
            <div style={{backgroundColor: "white", marginTop: '10px'}}>
                <div className="container">
                    <div className="main-body"
                         style={{boxShadow: "0px 1px 25px 0px rgba(193,193,193,1)", borderRadius: "15px"}}>
                        <nav aria-label="breadcrumb" className="main-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active" aria-current="page">Notification</li>
                            </ol>
                        </nav>
                        <hr/>
                        <div className="">
                            <div className="card"
                                 style={{boxShadow: "0px 1px 5px 0px rgba(193,193,193,1)", borderRadius: "10px"}}>
                                <div className="card-body" style={{maxWidth: "100%"}}>
                                    <div className="d-flex flex-column text-center">
                                        <table class="table">
                                            <thead>
                                            <tr className="table-danger">
                                                <th className="table-danger">Home's Name</th>
                                                <th className="table-danger">Username</th>
                                                <th className="table-danger">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody className="table-group-striped">
                                            {notifications.map(item => (<tr className="align-bottom">
                                                <td className="">{item.name}</td>
                                                <td className="">{item.username}</td>
                                                <td className="">{item.content}</td>
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
        </>
    )
}
export default Notification