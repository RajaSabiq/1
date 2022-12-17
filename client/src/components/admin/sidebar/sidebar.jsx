import './sidebar.css'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { sidebarDisp } from '../../../data/atom'
import { useEffect } from 'react'
import logo from '../../../assets/images/logo.png'
import Cookies from 'js-cookie'

const Sidebar = () => {
    const [sidebarDisplay, setSidebarDisplay] = useRecoilState(sidebarDisp)

    useEffect(() => {
        setSidebarDisplay(false)
    }, [window.location.pathname])

    return (
        <div className={`admin__sidebar ${sidebarDisplay && 'admin__sidebar__left'}`}>
            <div className="sidebar__header">
                <div className="sidebar__logo">
                    <Link to='/'>
                        <img src={logo} alt="sidebar__logo" />
                    </Link>
                </div>
                <div className="sidebar__close"
                    onClick={() => setSidebarDisplay(false)}
                >
                    <i className='fa fa-close'></i>
                </div>
            </div>
            <div className="sidebar__links">
                <ul>
                    <li><Link to="/admin/referral"><i className='fa fa-dollar-sign'></i><span>My Referral</span></Link></li>
                    <li><Link to="/admin/upload"><i className='fa fa-upload'></i><span>Upload Content</span></Link></li>
                    <li><Link to="/admin/music"><i className='fa fa-music'></i><span>Music List</span></Link></li>
                    <li><Link to="/admin/talent"><i className='fa fa-chart-column'></i><span>Talent List</span></Link></li>
                    <li><Link to="/admin/comedy"><i className='fa fa-face-smile'></i><span>Comedy List</span></Link></li>
                    <li><a onClick={() => {
                        localStorage.removeItem("user")
                        localStorage.removeItem("token")
                        Cookies.remove('token');
                        window.location.reload();
                    }}><i className='fa fa-right-from-bracket'></i><span>Sign Out</span></a></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar