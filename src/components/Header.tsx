import React from 'react'
import styles from "./index.css"
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



const Header = () => {
    const classes = {
        headerContainer: 'flex items-center justify-between px-10 pr-16 py-[5px] shadow-header',
        homeLink: 'border-b-2 border-[#27378C] font-semibold pb-[1px]',
        profileImg: 'inline w-10 mx-3',
        favourites: 'mx-5'
    }
    return (
        <div className={classes.headerContainer}>
            <img src="/images/logo.png" className='w-44' alt="" />
            <div className='text-[#27378C]'>
                <Link to='/' className={classes.homeLink}>Home</Link>
                <Link to='/favourites' className={classes.favourites}>Favourites</Link>
            </div>
            <div>
                <img className={classes.profileImg} src="/images/profile.png" alt="" />
                <KeyboardArrowDownIcon />
            </div>
        </div>
    )
}

export default Header