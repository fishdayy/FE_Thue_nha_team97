import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Swal from "sweetalert2";

const Navbar = () => {
    const navigate = useNavigate()
    const user = useSelector(state => {
        console.log(state)
        return state.user.userNow.user.userFind[0]
    })
    return (
        <div style={{backgroundColor:"white"}}>
            <div className='row' style={{backgroundColor:"white"}}>
                <div className='col-12' style={{backgroundColor:"white"}}>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor:"white"}}>
                        <div className="container-fluid" style={{backgroundColor:"white"}}>
                            <Link to={'/home'}><a className="navbar-brand" href="#"><img
                                src="https://asahiluxstay.com/v2/images/logo.png?v=2" className="logo"/></a></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link to={'/home'}><a className="nav-link active" aria-current="page"
                                                              href="#">Home</a></Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                            Post
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><Link to={'/home/create'}><a className="dropdown-item" >Create</a></Link></li>
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>
                                            <li><Link to={'/home/your-homes'}><a className="dropdown-item">List My Posts</a></Link></li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="username" style={{listStyle:"none",marginRight:"20px",marginBottom:"0px"}}>
                                    <li className="nav-item">
                                        <Link to={'/home/profile'}><a className="nav-link active" aria-current="page">{user.username}</a></Link>
                                    </li>
                                </ul>
                                <form className="d-flex" role="search">
                                    <button onClick={() => {
                                        localStorage.clear()
                                        navigate('/')
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Logout!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    }} className="btn btn-outline-danger" type="submit">Log Out
                                    </button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Navbar;