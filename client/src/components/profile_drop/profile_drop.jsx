import Cookies from 'js-cookie'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ProfileDrop = ({username, profileUrl}) => {
    const [toggleDropdown, setToggleDropdown] = useState(false)

    return (
        <div className="admin__profile">
            <img
                onClick={() => setToggleDropdown(prev => !prev)}
                src={profileUrl}
                alt=""
            />
            {toggleDropdown &&
                <div className="profile__dropdown">
                    <div className="dropdown__header">
                        <h5>{username}</h5>
                        <span>Online</span>
                    </div>
                    <div className="dropdown__body">
                        <Link to="/admin/home">
                            <div>
                                <div className="profile__icons">
                                    <i className="fa fa-home"></i>
                                </div>
                                <span>Dashboard</span>
                            </div>
                        </Link>
                        <Link to="/profile">
                            <div>
                                <div className="profile__icons">
                                    <i className="fa fa-user"></i>
                                </div>
                                <span>My Profile</span>
                            </div>
                        </Link>
                        <Link to="/profile/edit">
                            <div>
                                <div className="profile__icons">
                                    <i className="fa fa-pen"></i>
                                </div>
                                <span>Edit Profile</span>
                            </div>
                        </Link>
                    </div>
                    <div className="signout-btn">
                        <a onClick={() => {
                            localStorage.removeItem("user")
                            localStorage.removeItem("token")
                            Cookies.remove('token');
                            window.location.reload();
                        }}
                        >
                            <span>Signout</span> <i className='fa fa-right-from-bracket'></i></a>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfileDrop