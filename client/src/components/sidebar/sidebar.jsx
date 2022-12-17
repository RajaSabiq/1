import { useState } from "react"
import { Link } from "react-router-dom"

const Sidebar = ({ showSidebar, setShowSidebar, isAuth_, profileUrl, username }) => {
    const DARK_LIGHT = localStorage.getItem('dark') ? true : false
    const [darkLightToggle, setDarkLightToggle] = useState(DARK_LIGHT)
    const lightDarkModeHandler = () => {
        const body = document.querySelector('body')
        if (!darkLightToggle) {
            setDarkLightToggle(prev => prev = true)
            localStorage.setItem('dark', 'dark')
            body.classList.add('dark')
            body.classList.remove('light')
        } else {
            setDarkLightToggle(prev => prev = false)
            localStorage.removeItem('dark')
            body.classList.add('light')
            body.classList.remove('dark')
        }
    }
    return (
        <div className={`mobile-menu ${showSidebar && 'open'}`}>
            <div className="mobile-menu-head ls_bg-dark">
                <a onClick={() => setShowSidebar(false)} className="mobile-menu-close"></a>
                <Link className="navbar-brand" to="/">
                    <img src="https://art.2spice.link/uploads/sitesetting/logo.png" alt="Project name" className="" />
                    <span></span>
                </Link>
                <div onClick={lightDarkModeHandler}  className="mobile-menu-btn-color">
                    <img src="https://art.2spice.link/assets/frontend/images/icon_bulb_light.png" alt="" />
                </div>
            </div>
            <div className="mobile-menu-content">
                {
                    isAuth_ && <>
                        <div className="mobile-menu-user">
                            <div className="mobile-menu-user-img">
                                <img src={profileUrl} alt="" />
                            </div>
                            <p>{username}</p>
                        </div>
                        <a className="btn ls_bg-primary mobile-menu-upload">
                            <i className="cv cvicon-cv-upload-video"></i>
                            <span>Upload Video</span>
                        </a>
                    </>
                }
                <div className="mobile-menu-list">
                    <ul>
                        <li className="">
                            <Link to="/category/music">
                                <i className="cv cvicon-cv-play-circle ls_color-primary"></i>
                                <p>Music</p>
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/category/comedy">
                                <i className="cv cvicon-cv-play-circle ls_color-primary"></i>
                                <p>Comedy</p>
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/category/talent">
                                <i className="cv cvicon-cv-play-circle ls_color-primary"></i>
                                <p>Talent</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                {isAuth_ ?
                    <Link to="/admin/home" className="btn mobile-menu-logout">Dashboard</Link> :
                    <Link to="/login" className="btn mobile-menu-logout">Sign In</Link>}
            </div>
        </div>
    )
}

export default Sidebar