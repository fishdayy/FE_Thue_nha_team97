import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeHome, showYourHomes} from "../service/homeService";
import {Link} from "react-router-dom";
import Search from "../components/Search";
import Swal from 'sweetalert2';

const YourHomes = () => {

    const Swal = require('sweetalert2')

    let dataHome = useSelector(state => {
        console.log(state)
        return state.home.listHome
    })

    let userId = useSelector(state => {
        return state.user.userNow.userFind[0].id
    })
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(showYourHomes(userId))
        })()
    }, [])


    return (<div>
        <div>
            <Search></Search>
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
                        <div>
                            <strong style={{textAlign: "left"}}>{item.name}</strong>
                            <p style={{fontWeight: "200", textAlign: "left", marginBottom: "0"}}>{item.address}</p>
                            <strong style={{textAlign: "left"}}>{item.price}$<label
                                style={{fontWeight: "200", marginLeft: "10px"}}>/ Day</label></strong>
                        </div>
                        <div>
                            <button onClick={() => {
                                const swalWithBootstrapButtons = Swal.mixin({
                                    customClass: {
                                        confirmButton: 'btn btn-success',
                                        cancelButton: 'btn btn-danger'
                                    },
                                    buttonsStyling: false
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
                                        swalWithBootstrapButtons.fire(
                                            'Deleted!',
                                            'Your file has been deleted.',
                                            'success',
                                            dispatch(removeHome(item.id))
                                        )
                                    } else if (
                                        /* Read more about handling dismissals below */
                                        result.dismiss === Swal.DismissReason.cancel
                                    ) {
                                        swalWithBootstrapButtons.fire(
                                            'Cancelled',
                                            'Your imaginary file is safe :)',
                                            'error'
                                        )
                                    }
                                })
                            }} className="btn btn-info "
                                    style={{
                                        backgroundColor: "#dc3545", color: "white", borderRadius: "10px",marginRight:"10px",borderColor:"#dc3545"
                                    }}>Delete
                            </button>
                            <button className="btn btn-info "
                                    style={{
                                        backgroundColor: "#dc3545", color: "white", borderRadius: "10px",borderColor:"#dc3545"
                                    }}>Edit
                            </button>
                        </div>
                    </div>))}
                </div>
            </div>
        </div>
    </div>)
};

export default YourHomes;