import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showListHome} from "../service/homeService";
import {Link} from "react-router-dom";
import Search from "../components/Search";
import Banner from "../components/Banner";
import TopHome from "./topHome";
import './CSS/post.css'

const ListHome = () => {
    let dataHome = useSelector(state => {
        console.log(state)
        return state.home.listHome
    })

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(showListHome())
        })()
    }, [])


    return (<div>
        <div>
            <Banner></Banner>
        </div>
        <div>
            <Search></Search>
        </div>
        <div>
            <h2 style={{textAlign: "center", marginBottom: "20px", marginTop: "20px", color: "#dc3545"}}>Recommended
                place for you</h2>
            <p style={{textAlign: "center", marginBottom: "30px"}}>Discover and enjoy your stay with special offers when
                coming to Asahi Luxstay.</p>
        </div>
        <div className="row">
            <div className="col-12">
                <div className="row p-3">
                    {dataHome.map(item => (
                        <div className="col-3 item-home">
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
                                <h5 style={{marginBottom: "10px"}}><strong
                                    style={{textAlign: "left"}}>{item.name}</strong></h5>
                                <i className="fa-sharp fa-solid fa-map-location" style={{marginRight: "10px"}}></i>
                                <label style={{
                                    fontWeight: "200",
                                    textAlign: "left",
                                    marginBottom: "0"
                                }}>{item.address}</label><br/>
                                <i className="fa-solid fa-money-bill" style={{marginRight: "10px"}}></i>
                                <strong style={{textAlign: "left"}}>{item.price}$<label
                                    style={{fontWeight: "200", marginLeft: "10px"}}>/ Day</label></strong>
                            </div>
                        </div>))}
                </div>
            </div>
        </div>
        <div>
            <h2 style={{textAlign: "center", marginBottom: "20px", marginTop: "20px", color: "#dc3545"}}>Top 4 popular
                areas</h2>
            <p style={{textAlign: "center", marginBottom: "30px"}}>Popular places to stay that are of interest to many
                tourists and often visit</p>
        </div>
        <div>
            <TopHome></TopHome>
        </div>
    </div>)
};

export default ListHome;