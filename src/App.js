import {Route, Routes, useLocation} from "react-router-dom";
import Login from "./page/login";
import {useSelector} from "react-redux";
import Register from "./page/register";
import Home from "./page/home";
import './App.css';
import ListHome from "./page/listHomes";
import Detail from "./page/detail";
import YourHomes from "./page/yourHomes";
import CreatePost from "./page/create";
import Profile from "./page/profile";
import History from "./page/history";
import EditPost from "./page/editPost";
import HomeRental from "./page/previousRental";
import HomeByCategory from "./page/homeByCategory";
import HomeBySearch from "./page/homeBySearch";
import {useEffect} from "react";

function App() {
    let location = useLocation();
    let dataUser = useSelector(state => {
        return state.user.userNow
    })
    useEffect(()=> {
        window.scrollTo(0 , 0)
    }, [location.pathname])
    return (
        <Routes>
            <Route path={'/register'} element={<Register/>}></Route>
            <Route path={'/'} element={<Login/>}></Route>
            {
                dataUser != null ?
                    <Route path={'/home'} element={<Home/>}>
                        <Route path={'/home'} element={<ListHome/>}></Route>
                        <Route path={'by-category'} element={<HomeByCategory/>}></Route>
                        <Route path={'by-search'} element={<HomeBySearch/>}></Route>
                        <Route path={'previous-rental-history'} element={<History/>}></Route>
                        <Route path={'home-rental-history'} element={<HomeRental/>}></Route>
                        <Route path={'profile'} element={<Profile/>}></Route>
                        <Route path={'detail/:id'} element={<Detail></Detail>}></Route>
                        <Route path={'create'} element={<CreatePost/>}></Route>
                        <Route path={'your-homes'} element={<YourHomes></YourHomes>}></Route>
                        <Route path={'edit/:id'} element={<EditPost></EditPost>}></Route>
                    </Route>
                    :
                    <Route path="*" element={<Login/>}/>
            }
        </Routes>
    );
}

export default App;

