import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Search from "../components/Search";
import "./CSS/login.css"
import Banner from "../components/Banner";
import {showListHome} from "../service/homeService";
import Pagination from "../components/Pagination";

const HomesByCategory = () => {

    let dataHome = useSelector(state => {
        return state.home.listHome
    })
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const dispatch = useDispatch()


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataHome.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (<div>
        <div>
            <Banner></Banner>
        </div>
        <div>
            <Search></Search>
        </div>
        <div className="row">
            <div className="col-12">
                <div>
                    <h2 style={{textAlign: "center", marginBottom: "20px", marginTop: "20px",color:"#dc3545"}}>Discover more types of tourism</h2>
                    <p style={{textAlign: "center", marginBottom: "30px"}}>Find unique travel experiences and explore regional cultures and countries through articles with Asahi Luxstay</p>
                </div>
                <div className="row p-3">
                    {dataHome.slice((currentPage - 1) * postsPerPage, (currentPage) * postsPerPage).map(item => (
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
                                <h5 style={{marginBottom:"10px"}}> <strong style={{textAlign: "left"}}>{item.name}</strong></h5>
                                <i className="fa-sharp fa-solid fa-map-location" style={{marginRight:"10px"}}></i>

                                <label style={{fontWeight: "200", textAlign: "left", marginBottom: "0"}}>{item.address}</label><br/>
                                <i className="fa-solid fa-money-bill" style={{marginRight:"10px"}}></i>

                                <strong style={{textAlign: "left"}}>{item.price}$<label
                                    style={{fontWeight: "200", marginLeft: "10px"}}>/ Day</label></strong>
                            </div>
                        </div>))}
                </div>
                <div>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={dataHome.length}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    </div>)
};

export default HomesByCategory;