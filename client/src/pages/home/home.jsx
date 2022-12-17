import { useCallback, useEffect, useState } from "react"
import Banner from "../../components/banner/banner"
import BannerCard from "../../components/banner_card/banner_card"
import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"
import Videos from "../../components/videos/videos"
import { useRecoilValue } from "recoil"
import { isAuth, userData } from "../../data/atom"
import _ from 'underscore';
import Api from "../../api/api"
import Spinner from "../../components/spinner/spinner"

const Home = () => {
    const isAuth_ = useRecoilValue(isAuth)
    const userData_ = useRecoilValue(userData)
    const [allVideos, setAllVideos] = useState([])
    const [filteredVideos, setFilteredVideos] = useState([])
    const [sortVideos, setSortVideos] = useState([])
    const [isLoader, setIsLoader] = useState(true)

    const getAllVideos = useCallback(async (isSubscribe) => {
        const res = await Api.getAllVideos();
        if (isSubscribe) {
            if (res.status === 200) {
                setAllVideos(res.data.data);
                setFilteredVideos(res.data.data);
                setSortVideos(res.data.data);
                setIsLoader(false)
            }
        }
    }, []);

    const setSortKey = (key) => {
        if (key === 0) {
            let data = _.sortBy(filteredVideos, 'createdAt').reverse();
            setSortVideos(data);
        } else if (key === 1) {
            let data = _.sortBy(filteredVideos, 'watchCount').reverse();
            setSortVideos(data);
        } else if (key === 2) {
            let data = _.sortBy(filteredVideos, 'likeCount').reverse();
            setSortVideos(data);
        }
    }

    useEffect(() => {
        let isSubscribe = true;
        getAllVideos(isSubscribe);
        return () => (isSubscribe = false);
    }, []);

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
                        <Banner isAuth_={isAuth_} />
                        <BannerCard
                            allVideos={allVideos}
                            setFilteredVideos={setFilteredVideos}
                            setSortVideos={setSortVideos}
                        />
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <Videos
                                        videoHeader={'Featured Videos'}
                                        showFilter={true}
                                        data={sortVideos}
                                        setSortKey={setSortKey}
                                    />
                                    <Videos
                                        videoHeader={'Other Videos'}
                                        showFilter={false}
                                        data={allVideos}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}

export default Home