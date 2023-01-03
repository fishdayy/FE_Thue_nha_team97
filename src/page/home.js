import React from 'react';
import {Outlet} from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const Home = () => {
    return (
        <div>
            <div style={{marginBottom:"50px"}}>
                <NavBar></NavBar>
            </div>
            <Outlet/>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Home;