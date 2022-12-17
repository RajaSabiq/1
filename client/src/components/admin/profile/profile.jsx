import './profile.css'
import { Link } from 'react-router-dom'

const Profile = ({ username, profileUrl, email, firstName, lastName }) => {
    return (
        <div className='user__profile__cont'>
            <div className="user__profile__wrapper">
                <div className="user__profile_header">
                    <p>{username}'s profile</p>
                </div>
                <div className="admin__profile">
                    <img src={profileUrl} alt="" />
                </div>
                <Detail title="Username" detail={username} />
                <Detail title="First Name" detail={firstName} />
                <Detail title="Last Name" detail={lastName} />
                <Detail title="Email" detail={email} />
                <div className="profile__edit__btn">
                    <Link to="/profile/edit">
                        <i className="fa fa-pen"></i> &nbsp;
                        <span>Edit Profile</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const Detail = ({ title, detail }) => {
    return (
        <div className="profile__detail__wrapper">
            <p className="profile__label">{title}</p>
            <p >{detail}</p>
        </div>
    )
}

export default Profile