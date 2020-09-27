import React, { useEffect, useState } from 'react'
import './NavBar.css'

function NavBar() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 140) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        })
    }, [])

    return (
        <div className={`nav ${show && 'scrolled'}`}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png" alt="Netflix" className='nav__logo' />
            <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" className='nav__avatar' alt="" />
        </div>
    )
}

export default NavBar
