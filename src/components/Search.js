import '../page/CSS/login.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {showHomesByAddress, showHomesByCategory, showListHome} from "../service/homeService";
import {showCategories} from "../service/categoryService";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useState} from 'react'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {DateRange} from 'react-date-range';
import {format} from "date-fns";


const Search = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);
    const [openOption, setOpenOption] = useState(false)
    const [options, setOptions] = useState(
        {
            bathroom: 1,
            bedroom: 1,
        }
    );

    //
    const dataCategory = useSelector(state => {
        return state.category.listCategory
    })
    useEffect(() => {
        dispatch(showCategories())
    }, [])


    return (
        <div className="container"
             style={{
                 borderRadius: "25px",
                 boxShadow: "0px 1px 25px 0px rgba(193,193,193,1)",
                 marginBottom: "50px",
                 height: "130px"
             }}>
            <ul className="nav nav-pills mb-3  nav-pills-flex">
                <li className="nav-item" role="presentation" style={{marginTop: "10px"}}>
                    <button className="nav-link pills-home-tab" id="pills-home-tab" data-bs-toggle="#pills-home"
                            role="tab" aria-controls="pills-home">
                        <div style={{display: "flex", alignItems: "center"}}>
                            <i className="fa-solid fa-home" style={{color: "black", padding: "0 10px"}}></i>
                            <div className="nav-link-strong">
                                <strong style={{color: "black"}} onClick={() => {
                                    if (dataCategory.length > 0)
                                        dispatch(showHomesByCategory(dataCategory[0].id))
                                    navigate('/home/homes-by-category')
                                }}>
                                    {dataCategory[0] && dataCategory[0].name}
                                </strong>
                            </div>
                        </div>
                    </button>
                </li>
                <li className="nav-item" role="presentation" style={{marginTop: "10px"}}>
                    <button className="nav-link pills-home-tab" id="pills-home-tab" data-bs-toggle="#pills-home"
                            role="tab" aria-controls="pills-home">
                        <div style={{display: "flex", alignItems: "center"}}>
                            <i className="fa-solid fa-dungeon" style={{color: "black", padding: "0 10px"}}></i>
                            <div className="nav-link-strong">
                                <strong style={{color: "black"}} onClick={() => {
                                    if (dataCategory.length > 0)
                                        dispatch(showHomesByCategory(dataCategory[1].id))
                                    navigate('/home/homes-by-category')
                                }}>
                                    {dataCategory[1] && dataCategory[1].name}
                                </strong>
                            </div>
                        </div>
                    </button>
                </li>
                <li className="nav-item" role="presentation" style={{marginTop: "10px"}}>
                    <button className="nav-link pills-home-tab" id="pills-home-tab" data-bs-toggle="#pills-home"
                            role="tab" aria-controls="pills-home">
                        <div style={{display: "flex", alignItems: "center"}}>
                            <i className="fa-solid fa-hotel" style={{color: "black", padding: "0 10px"}}></i>
                            <div className="nav-link-strong">
                                <strong style={{color: "black"}} onClick={() => {
                                    if (dataCategory.length > 0)
                                        dispatch(showHomesByCategory(dataCategory[2].id))
                                    navigate('/home/homes-by-category')
                                }}>
                                    {dataCategory[2] && dataCategory[2].name}
                                </strong>
                            </div>
                        </div>
                    </button>
                </li>

            </ul>
            <ul className="nav nav-pills mb-3  nav-pills-flex">
                <Formik initialValues={{address: "", bedroom: "", bathroom: "", price: ""}} onSubmit={(values, {resetForm}) => {
                    dispatch(showHomesByAddress(values))
                    resetForm()
                    navigate('/home/homes-find')
                }}>
                    <Form className="nav nav-pills mb-3  nav-pills-flex" style={{width: "100%"}}>
                        <div style={{
                            display: "flex",
                            width: "25%",
                            alignItems: "center",
                            marginRight: "1%",
                            border: "1px solid",
                            borderRadius: "5px"
                        }}>
                            <i className="fa-solid fa-magnifying-glass" style={{padding: "0 10px"}}></i>
                            <Field name={"address"} type="text" placeholder="Where are you going?" className="text-search"
                                   style={{border: "none", marginRight: "5px"}}/>
                        </div>
                        <div style={{
                            display: "flex",
                            width: "25%",
                            alignItems: "center",
                            border: "1px solid",
                            marginRight: "1%",
                            borderRadius: "5px"
                        }}>
                            <i className="fa-solid fa-calendar-days" style={{padding: "0 10px"}}></i>
                            <span onClick={() => setOpenDate(!openDate)} className="text-search"
                                  style={{marginRight: "10px"}}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && <DateRange
                                editableDateInputs={true}
                                onChange={item => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                className="date"
                            />}
                        </div>
                        <div style={{
                            display: "flex",
                            width: "15%",
                            alignItems: "center",
                            border: "1px solid",
                            marginRight: "1%",
                            borderRadius: "5px"
                        }}>
                            <i className="fa-solid fa-bed" style={{padding: "0 10px"}}></i>
                            <Field as="select" name={"bedroom"} type="number" style={{border:"none"}}>
                                <option value={""}>Bedroom</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </Field>
                        </div>
                        <div style={{
                            display: "flex",
                            width: "15%",
                            alignItems: "center",
                            border: "1px solid",
                            marginRight: "1%",
                            borderRadius: "5px"
                        }}>
                            <i className="fa-solid fa-sink" style={{padding: "0 10px"}}></i>
                            <Field as="select" name={"bathroom"} type="number" style={{border:"none"}}>
                                <option value={""}>Bathroom</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </Field>
                        </div>
                        <div style={{display: "flex", width: "5%", alignItems: "center", marginLeft: "5%"}}>
                            <button className="btn btn-danger" type="submit" style={{marginLeft: "10px"}}>Search
                            </button>
                        </div>
                    </Form>
                </Formik>
            </ul>
        </div>
    )
}
export default Search;