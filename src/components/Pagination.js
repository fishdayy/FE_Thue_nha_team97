import React from 'react';
import {Link} from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    console.log({ postsPerPage, totalPosts, paginate })

    return (
        <nav>
            <ul className='pagination' style={{justifyContent:"center"}}>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <Link onClick={() => paginate(number)} to="" className='page-link' style={{backgroundColor:"#dc3545",color:"white"}}>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;