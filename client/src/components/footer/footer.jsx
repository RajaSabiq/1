import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from '../../assets/images/logo.png'
import telegram from '../../assets/images/telegram.webp'
import discord from '../../assets/images/discord.webp'
import twitter from '../../assets/images/twitter.svg'

const Footer = () => {
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
    const setLightDarkMode = () => {
        const body = document.querySelector('body')
        if (!localStorage.getItem('dark')) {
            setDarkLightToggle(prev => prev = false)
            localStorage.removeItem('dark')
            body.classList.add('light')
            body.classList.remove('dark')
        } else {
            setDarkLightToggle(prev => prev = true)
            localStorage.setItem('dark', 'dark')
            body.classList.add('dark')
            body.classList.remove('light')
        }
    }

    useEffect(() => {
        setLightDarkMode()
    }, [])

    return (
        <>
            <div onClick={lightDarkModeHandler} className="mobile-menu-btn-color ls_dark-mode-btn">
                <i className="fa fa-lightbulb" aria-hidden="true"></i>
            </div>

            <footer className="ls_py-40" style={{ background: '#1e1e1e' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ls_mb-20">
                                <img src={logo} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="ls_footer-nav">
                                <ul>
                                    <li><a href="#">Terms Of Use</a></li>
                                    <li><a href="#">Privacy</a></li>
                                    <li><a href="#">Account</a></li>
                                    <li><Link to="/contact">Contact Us</Link></li>
                                    <li><a href="#">Media Center</a></li>
                                    <li><a href="#">Cookie Preferences</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-2">
                            <div className="footer-links">
                                <a href="https://t.me/spice_channe">
                                    <img src={telegram} alt="Telegram" width="36px" height="36px" />
                                </a>
                                <a href="https://discord.gg/GBNu5FAYDc">
                                    <img src={discord} alt="Discord" width="36px" height="36px" />
                                </a>
                                <a href="https://twitter.com/2spice2?s=21&t=TCOSj5e-oSG2ONg4sdFxoA">
                                    <img src={twitter} alt="Twitter" width="36px" height="36px" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer