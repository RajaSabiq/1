import { useEffect } from "react"
import Header from "../../components/admin/header/header"
import Sidebar from "../../components/admin/sidebar/sidebar"
import UploadForm from '../../components/admin/upload/upload'
import { userData } from "../../data/atom"
import { useRecoilValue } from 'recoil'

const Upload = () => {
    const userData_ = useRecoilValue(userData)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="admin">
            <Sidebar />
            <div className="admin__dashboardPanel">
                <Header
                    username={userData_.userName}
                    profileUrl={userData_.profileUrl}
                />
                <div className='admin__dashboard'>
                    <div className="dashboard__cont">
                        <UploadForm
                            uid={userData_.uid}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload