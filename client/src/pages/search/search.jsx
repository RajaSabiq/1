import React, { useCallback, useEffect, useState } from 'react'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Videos from '../../components/videos/videos'
import { useRecoilValue } from "recoil"
import { isAuth, userData } from "../../data/atom"
import Api from '../../api/api'
import Spinner from '../../components/spinner/spinner'

const SearchVideos = () => {
    const isAuth_ = useRecoilValue(isAuth)
    const userData_ = useRecoilValue(userData)
    const [allVideos, setAllVideos] = useState([])
    const [isLoader, setIsLoader] = useState(true)

    const getAllVideosBySearchName = useCallback(async (isSubscribe) => {
        const res = await Api.getAllVideosBySearchName({ search: window.location.pathname.slice(8) });
        if (isSubscribe) {
            if (res.status === 200) {
                setAllVideos(res.data.data);
                setIsLoader(false)
            }
        }
    }, []);

    useEffect(() => {
        setIsLoader(true)
        let isSubscribe = true;
        getAllVideosBySearchName(isSubscribe);
        return () => (isSubscribe = false);
    }, [window.location.pathname]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            {isLoader ?
                <Spinner /> :
                <>
                    <Header
                        isAuth_={isAuth_}
                        username={userData_.userName}
                        profileUrl={userData_.profileUrl}
                    />
                    <div className="content-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <Videos
                                        videoHeader={`Search Videos`}
                                        showFilter={false}
                                        data={allVideos}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>}
        </>
    )
}

export default SearchVideos

