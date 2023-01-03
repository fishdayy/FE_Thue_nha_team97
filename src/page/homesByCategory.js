import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Search from "../components/Search";

const HomesByCategory = () => {

    let dataHome = useSelector(state => {
        console.log(state)
        return state.home.listHome
    })

    return (<div>
        <div>
            <Search></Search>
        </div>
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
                                <strong style={{textAlign: "left"}}>{item.price}$<label
                                    style={{fontWeight: "200", marginLeft: "10px"}}>/ Day</label></strong>
                            </div>
                        </div>))}
                </div>
            </div>
        </div>
    </div>)
};

export default HomesByCategory;