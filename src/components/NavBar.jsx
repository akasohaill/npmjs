import React from 'react'
import SearchBar from './SerachBar'
const NavBar = () => {
    return (
        <div className='main'>
            <div className='top-border'></div>
            <ul className='items'>
                <li>❤</li>
                <li>Pro</li>
                <li>Team</li>
                <li>Pricing</li>
                <li>Documentation</li>
            </ul>
            <hr />
            <div className='bar'>
                <p className="logo">npm</p>
                <div className='search-bar'>
                    <SearchBar />
                </div>
                <div className='btns'>
                    <div className='btn'>Sign Up</div>
                    <div className='btn btn-1'>Sign In</div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
