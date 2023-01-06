import {Route, Routes} from "react-router-dom";
import Login from "./page/login";
import {useSelector} from "react-redux";
import Register from "./page/register";
import Home from "./page/home";
import './App.css';
import ListHome from "./page/listHomes";
import Detail from "./page/detail";
import YourHomes from "./page/yourHomes";
import HomesByCategory from "./page/homesByCategory";
import HomesByAddress from "./page/homeByAddress";
import CreatePost from "./page/create";
import Profile from "./page/profile";
import History from "./page/history";
import PreviousRental from "./page/previousRental";
import EditPost from "./page/editPost";
import HomeRental from "./page/previousRental";

function App() {
    let dataUser = useSelector(state => {
        return state.user.userNow
    })
    return (
        <Routes>
            <Route path={'/register'} element={<Register/>}></Route>
            <Route path={'/'} element={<Login/>}></Route>
            {
                dataUser != null ?
                    <Route path={'/home'} element={<Home/>}>
                        <Route path={'/home'} element={<ListHome/>}></Route>
                        <Route path={'previous-rental-history'} element={<History/>}></Route>
                        <Route path={'home-rental-history'} element={<HomeRental/>}></Route>
                        <Route path={'profile'} element={<Profile/>}></Route>
                        <Route path={'detail/:id'} element={<Detail></Detail>}></Route>
                        <Route path={'create'} element={<CreatePost/>}></Route>
                        <Route path={'your-homes'} element={<YourHomes></YourHomes>}></Route>
                        <Route path={'homes-by-category'} element={<HomesByCategory></HomesByCategory>}></Route>
                        <Route path={'homes-find'} element={<HomesByAddress></HomesByAddress>}></Route>
                        <Route path={'edit/:id'} element={<EditPost></EditPost>}></Route>
                    </Route>
                    :
                    <Route path="*" element={<Login/>}/>
            }
        </Routes>
    );
}

export default App;

