import Sidebar from "../../components/admin/sidebar/sidebar"
import Header from "../../components/admin/header/header"
import MyProfile from "../../components/admin/profile/profile"
import { useEffect } from "react"
import { userData } from "../../data/atom"
import { useRecoilValue } from "recoil"

const Profile = () => {
    const userData_ = useRecoilValue(userData)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="admin">
            <Sidebar />
            <div className="admin__dashboardPanel my__profile">
                <Header
                    username={userData_.userName}
                    profileUrl={userData_.profileUrl}
                />
                <div className='admin__dashboard'>
                    <div className="dashboard__cont">
                        <MyProfile
                            username={userData_.userName}
                            profileUrl={userData_.profileUrl}
                            email={userData_.email}
                            firstName={userData_.fName}
                            lastName={userData_.lName}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile