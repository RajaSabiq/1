import { useCallback, useEffect, useState } from "react"
import Header from "../../components/admin/header/header"
import List from "../../components/admin/list/list"
import Sidebar from "../../components/admin/sidebar/sidebar"
import { userData } from "../../data/atom"
import { useRecoilValue } from 'recoil'
import Api from "../../api/api"
import Loader from "../../components/loader/loader"

const Music = () => {
    const userData_ = useRecoilValue(userData)
    const [allVideos, setAllVideos] = useState([])
    const [isLoader, setIsLoader] = useState(true)

    const getAllVideosByCategoryName = useCallback(async (isSubscribe) => {
        const res = await Api.getAllVideosByCategoryName({ categoryName: 'music' });
        if (isSubscribe) {
            if (res.status === 200) {
                let data = res.data.data?.filter(item => item.uid === userData_.uid)
                setAllVideos(data);
                setIsLoader(false)
            }
        }
    }, []);

    useEffect(() => {
        let isSubscribe = true;
        getAllVideosByCategoryName(isSubscribe);
        return () => (isSubscribe = false);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            {isLoader ?
                <Loader /> :
                <div className="admin">
                    <Sidebar />
                    <div className="admin__dashboardPanel">
                        <Header
                            username={userData_.userName}
                            profileUrl={userData_.profileUrl}
                        />
                        <div className='admin__dashboard'>
                            <div className="dashboard__cont">
                                <List
                                    title={'Music Management'}
                                    data={allVideos}
                                />
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default Music