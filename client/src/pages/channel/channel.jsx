import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import Videos from "../../components/videos/videos"
import { useCallback, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { isAuth, userData } from "../../data/atom"
import Api from "../../api/api"
import Spinner from "../../components/spinner/spinner"

const Channel = () => {
    const isAuth_ = useRecoilValue(isAuth)
    const userData_ = useRecoilValue(userData)
    const [allVideos, setAllVideos] = useState([])
    const [isLoader, setIsLoader] = useState(true)

    const getAllVideos = useCallback(async (isSubscribe) => {
        const res = await Api.getAllVideosByUser({ uid: window.location.pathname.slice(9) });
        if (isSubscribe) {
            if (res.status === 200) {
                setAllVideos(res.data.data);
                setIsLoader(false)
            }
        }
    }, []);

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
                        <div className="container">
                            <div className="row ls_d-flex ls_align-center jumbotron ls_shadow-1 ls_pl-0">
                                <div className="col-md-6">
                                    <div className="ls_d-flex ls_align-center ls_channel">
                                        <img src={userData_.profileUrl}
                                            alt="" />
                                        <h4>{userData_.userName}</h4>
                                    </div>
                                </div>
                                <div className="col-md-6 ls_d-flex ls_justify-end">
                                    <div className="ls_channel">
                                        <a><i className="fa-brands fa-facebook"></i></a>
                                        <a><i className="fa-brands fa-twitter"></i></a>
                                        <a><i className="fa-brands fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <Videos
                                        videoHeader={'Videos'}
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

export default Channel