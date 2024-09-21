import React from 'react'
import './Styles.css'
import npm from './../assets/npm.png'
import SearchBar from './../components/SerachBar'
import NavBar from '../components/NavBar'

const SearchPage = () => {
  return (
    <div className='main-page'>
      <NavBar/>
      <div className="home-page">
        <h1>Build Amazing <br />Things</h1>
        <p>We're GitHub, the company behind the npm Registry and npm CLI. <br /> We offer those to the community for free, but our day job is building <br /> and selling useful tools for developers like you.</p>
        <h2>Take your JavaScript development <br />up a notch</h2>
        <p>Get started today for free, or step up to npm <br />Pro to enjoy a premium JavaScript development experience, <br />with features like private packages.</p>
        <div className='button'>
          <div className='btn-b'>SignUp for free</div>
          <div className='btn-b'>Lear about more</div>
        </div>
      </div>
      <div className="bottom-page">
        <div className='logo'>
          <img src={npm} alt="" />
        </div>
        <div className='content'>
          <h2>Bring the best of open <br />source to you, your team, and <br />your company</h2>
          <div className='para'><p>Relied upon by more than 17 million developers worldwide, npm is committed to making JavaScript development elegant, productive, and safe. The free npm Registry has become the center of JavaScript code sharing, and with more than two million packages, the largest software registry in the world. Our other tools and services take the Registry, and the work you do around it, to the next level.</p></div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
