import './CSS/login.css';
import './CSS/create.css';
import {Formik, Form, Field, ErrorMessage} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {createHome, editHome, showHome} from "../service/homeService";
import React, {useEffect, useState} from "react";
import {storage} from "./firebase/config";
import {
    ref, getDownloadURL, uploadBytesResumable
} from "firebase/storage";
import {createImg, showImagesByHomeId} from "../service/imageService";
import Swal from "sweetalert2";

const EditPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(state => {
        return state.user.userNow.user.userFind[0].id
    })
    let {id} = useParams();

    useEffect(() => {
        (async () => {
            await dispatch(showHome(id))
        })()
    }, [])

    let home = useSelector(state => {
        return state.home.listHome[0]
    })
    console.log(home)

    const handleSubmit = async (values) => {
        let avatar = urls[0]
        if (values.name === "") {
            values.name = home.name
        }
        if (values.address === "") {
            values.address = home.address
        }
        if (values.price === "") {
            values.price = home.price
        }
        if (values.description === "") {
            values.description = home.description
        }
        if (values.categoryId === "") {
            values.categoryId = home.categoryId
        }
        if (values.bedroom === "") {
            values.bedroom = home.bedroom
        }
        if (values.bathroom === "") {
            values.bathroom = home.bathroom
        }
        let data = {...values, id, avatar}
        let homes = await dispatch(editHome(data))
        let homeId = await homes.payload.idHome
        for (let i = 0; i < urls.length; i++) {
            let image = urls[i]
            let data = {homeId, image}
            await dispatch(createImg(data))
        }
        Swal.fire({
            icon: 'success',
            title: 'Updated',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(() => {
            clearTimeout()
            navigate('/home/your-homes')
        }, 1500)
    }
    //Upload IMG
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        const promises = [];
        if (images.length > 0) {
            images.map((image) => {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                promises.push(uploadTask);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setUrls(prevState => [...prevState, downloadURLs])
                            console.log("File available at", downloadURLs);
                        });
                    }
                );
            });
        }
        Promise.all(promises)
            .then(() => Swal.fire({
                icon: 'success',
                title: "Uploaded",
                showConfirmButton: false,
                timer: 1500
            }))
            .catch((err) => console.log(err));
    };
    //---END---
    return (
        <>
            <div>
                <h2 style={{textAlign: "center", marginBottom: "20px", marginTop: "20px"}}>Share your accommodation
                    information with us</h2>
                <p style={{textAlign: "center", marginBottom: "30px"}}>In this step, we'll ask what type of
                    accommodation you rent and do you want guests to book the whole house or just a specific room</p>
                <div className="formCreate">
                    <div className="create" id="backgroundCreate" style={{float: "left"}}>
                        <Formik initialValues={{
                            name: '',
                            address: '',
                            price: '',
                            description: '',
                            categoryId: '',
                            bedroom: '',
                            bathroom: '',
                            userId: userId
                        }} onSubmit={(values) => handleSubmit(values)}>
                            <Form id="createPost" tabIndex="500">
                                <h3 style={{color: "#dc3545"}}>Edit Post Rent Home</h3>
                                <div className="name" style={{display: "flex"}}>
                                    <Field type="text" name="name" placeholder={home && home.name}/>
                                    <label>Name</label>
                                </div>
                                <div className="address" style={{display: "flex"}}>
                                    <Field type="text" name="address" placeholder={home && home.address}/>
                                    <label>Address</label>
                                </div>
                                <div className="Price" style={{display: "flex"}}>
                                    <Field type="number" name="price" placeholder={home && home.price}/>
                                    <label>Price</label>
                                </div>
                                <div className="description" style={{display: "flex"}}>
                                    <Field style={{height: "200px"}} name="description" placeholder={home &&home.description}/>
                                    <label>Description</label>
                                </div>
                                <div className="category" style={{display: "flex"}}>
                                    <Field as={"select"} name={"categoryId"}>
                                        <option value="">{home &&home.category}</option>
                                        <option value="1">House</option>
                                        <option value="2">Homestay</option>
                                        <option value="3">Hotel</option>
                                    </Field>
                                    <label>Category</label>
                                </div>
                                <div className="bedroom" style={{display: "flex"}}>
                                    <Field as={"select"} name={"bedroom"}>
                                        <option value="">{home &&home.bedroom}</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Field>
                                    <label>Bedroom</label>
                                </div>
                                <div className="bathroom" style={{display: "flex"}}>
                                    <Field as={"select"} name={"bathroom"}>
                                        <option value="">{home &&home.bathroom}</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Field>
                                    <label>Bathroom</label>
                                </div>
                                <div className="submit" style={{border: "1px solid #999"}}>
                                    <button className="dark">Submit</button>
                                </div>
                            </Form>
                        </Formik>
                        <br/>
                        <div className="divImg" style={{display: "flex"}} tabIndex="500">
                            <input className="inputImg" style={{
                                position: "relative",
                                bottom: '119px',
                                width: '70%',
                                border: 'none',
                                left: "5%"
                            }}
                                   type="file" multiple onChange={handleChange}/>
                            <button style={{color: 'red', position: 'relative',width:"215px", bottom: '7.5rem'}}
                                    onClick={() => dispatch(handleUpload)}>Change Avatar
                            </button>
                        </div>
                        <br/>
                    </div>
                    <br/><br/><br/><br/>
                    <div className="infoCreate" id="backgroundCreate" style={{float: "left", borderRadius: "20px"}}>
                        <form id="createPost" tabIndex="500">
                            <ol>
                                <div>
                                    <div>
                                        <img
                                            src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
                                            style={{width: "120px", height: "120px"}}/>
                                    </div>
                                    <div>
                                        <li>
                                            <strong>
                                                Tell us about your place
                                            </strong>
                                            <p>
                                                Share some basic information, like the location of the rental property
                                                and how many guests can stay there.
                                            </p>
                                        </li>
                                    </div>


                                </div>
                                <hr/>
                                <div>
                                    <div>
                                        <div>
                                            <img
                                                src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
                                                style={{width: "120px", height: "120px"}}/>
                                        </div>
                                    </div>
                                    <div>
                                        <li>
                                            <strong>
                                                Make your rental home/room stand out
                                            </strong>
                                            <p>
                                                Add 5 or more photos with a title and description – we'll help you do
                                                it. </p>
                                        </li>
                                    </div>

                                </div>

                                <hr/>
                                <div>
                                    <div>
                                        <img
                                            src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
                                            style={{width: "120px", height: "120px"}}/>
                                    </div>

                                    <div>
                                        <li>
                                            <strong>
                                                Finalize and post rentals
                                            </strong>
                                            <p>
                                                Choose whether you want to start with experienced hospitality, choose a
                                                starting price, or post a rental. </p>
                                        </li>
                                    </div>
                                </div>
                            </ol>
                        </form>
                    </div>
                </div>
                <div style={{marginTop: "50%"}}>
                </div>
            </div>
        </>
    )
}
export default EditPost;