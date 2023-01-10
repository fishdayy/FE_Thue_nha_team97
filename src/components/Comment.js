import "../page/CSS/comment.css"
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {Avatar} from "@mui/material";
import {useSelector} from "react-redux";

const Comment = () => {



    const [value, setValue] = React.useState(1);
    return(
        <>
            <div className="card">
                <div className="row">
                    <div className="col-1">
                        <img src="" className="rounded-circle mt-2" style={{height:"100px",width:"100px"}}/>
                    </div>
                    <div className="col-11">
                        <div className="comment-box ml-2">
                            <h5>Add a comment</h5>
                            <div className="rating">
                                <Typography component="legend"></Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </div>
                            <div className="comment-area">
                                        <textarea style={{resize:"none"}} className="form-control" placeholder="what is your view?"
                                                  rows="4"></textarea>
                            </div>
                            <div className="comment-btns mt-2">
                                <div className="row">
                                    <div className="col-1">
                                        <div className="pull-left">
                                            <button className="btn btn-success btn-sm">Cancel</button>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="pull-right">
                                            <button className="btn btn-success send btn-sm">Send <i
                                                className="fa fa-long-arrow-right ml-1"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="user d-flex flex-row align-items-center">
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" style={{marginRight:"10px"}}/>
                        <span><small className="font-weight-bold text-primary">james_olesenn</small> <small
                            className="font-weight-bold">Hmm, This poster looks cool</small></span><br/>
                    </div>
                    <div className="action d-flex justify-content-between mt-2 align-items-center">
                        <div className="icons align-items-center">
                            <i className="fa fa-star text-warning"></i>
                            <i className="fa fa-check-circle-o check-icon"></i>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Comment