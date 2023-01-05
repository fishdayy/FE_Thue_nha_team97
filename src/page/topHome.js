import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showTop4} from "../service/homeService";
import {Link} from "react-router-dom";

function TopHome() {

    let dataHome = useSelector(state => {
        return state.home.top4Home
    })

    console.log(dataHome)

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(showTop4())
        })()
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="row p-3">
                        {dataHome.map(item => (
                            <div className="col-3">
                                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <Link to={`/home/detail/${item.id}`}>
                                                <img className="d-block w-100" src={item.avatar} style={{
                                                    width: "322px",
                                                    height: "306px",
                                                    borderRadius: "20px"
                                                }}
                                                     alt="First slide"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <strong style={{textAlign: "left"}}>{item.name}</strong>
                                    <p style={{fontWeight: "200", textAlign: "left", marginBottom: "0"}}>{item.address}</p>
                                    <p style={{textAlign: "left"}}>Number of hires: {item.hire}</p>
                                    <strong style={{textAlign: "left"}}>{item.price}$<label
                                        style={{fontWeight: "200", marginLeft: "10px"}}>/ Day</label></strong>
                                </div>
                            </div>))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopHome;