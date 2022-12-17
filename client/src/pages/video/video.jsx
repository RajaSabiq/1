import { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Player } from 'video-react';
import { Switch } from '@mui/material';
import { useRecoilValue } from "recoil"
import { isAuth, userData } from "../../data/atom"
import moment from "moment";
import Carousel from "react-multi-carousel";
import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"
import ShareModal from "../../components/videos/video/share_modal";
import Api from "../../api/api";
import Spinner from "../../components/spinner/spinner";

const RESPONSIVE = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Video = () => {
    const history = useHistory()
    const userData_ = useRecoilValue(userData)
    const isAuth_ = useRecoilValue(isAuth)
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loader, setLoader] = useState(true)
    const [isLike, setIsLike] = useState({ isLike: false, count: 0 })
    const [isFollow, setIsFollow] = useState({ isFollow: false, count: 0 })
    const [videoData, setVideoData] = useState({})
    const [allVideos, setAllVideos] = useState([])
    const [allComments, setAllComments] = useState({ comments: [], count: 0 })

    const followUser = async (uid) => {
        if (isAuth_) {
            const res = await Api.followUser({ uid, fUid: userData_?.uid })
            if (res.status === 201) {
                setIsFollow((prev) => ({ ...prev, isFollow: true }))
            } else if (res.status === 200) {
                setIsFollow((prev) => ({ ...prev, isFollow: false }))
            }
            getUserFollow(uid)
        } else {
            history.push('/login');
        }
    }

    const likeVideo = async (uid, aid) => {
        if (isAuth_) {
            const res = await Api.likeVideo({ uid, aid })
            if (res.status === 201) {
                setIsLike((prev) => ({ ...prev, isLike: true }))
            } else if (res.status === 200) {
                setIsLike((prev) => ({ ...prev, isLike: false }))
            }
            getUserLike(window.location.pathname.slice(14))
        } else {
            history.push('/login');
        }
    }

    const addVideoComment = async (e, uid, aid, message) => {
        e.preventDefault()
        if (isAuth_) {
            if (message.length > 0) {
                const res = await Api.addVideoComment({ uid, aid, message })
                if (res.status === 200) {
                    window.location.reload()
                    // getVideoComments(window.location.pathname.slice(14))
                }
            }
        } else {
            history.push('/login');
        }
    }

    const getVideoComments = async (aid) => {
        if (aid) {
            const res1 = await Api.getVideoComments({ aid })
            if (res1.status === 200) {
                setAllComments((prev) => ({ comments: res1.data.data, count: res1.data.count }))
            }
        }
    }
    const getUserFollow = async (uid) => {
        if (uid) {
            const res1 = await Api.getFollowUser({ uid })
            if (res1.status === 200) {
                setIsFollow((prev) => ({ ...prev, count: res1.data.count }))
                res1.data.data?.map(item => {
                    if (item.fUid === userData_.uid) {
                        setIsFollow((prev) => ({ ...prev, isFollow: true }))
                        return;
                    }
                })
            }
        }
    }

    const getUserLike = async (aid) => {
        if (aid) {
            const res1 = await Api.getVideoLikes({ aid })
            if (res1.status === 200) {
                setIsLike((prev) => ({ ...prev, count: res1.data.count }))
                res1.data.data?.map(item => {
                    if (item.uid === userData_.uid) {
                        setIsLike((prev) => ({ ...prev, isLike: true }))
                        return;
                    }
                })
            }
        }
    }

    const getVideoDetail = useCallback(async (isSubscribe) => {
        const res = await Api.getSingleVideo({ aid: window.location.pathname.slice(14) });
        if (isSubscribe) {
            if (res.status === 200) {
                setVideoData(res.data.data);
                setLoader(false)
                getUserFollow(res.data.data?.uid)
                getUserLike(window.location.pathname.slice(14))
            }
        }
    }, []);

    const addView = useCallback(async () => {
        await Api.addView({ aid: window.location.pathname.slice(14), uid: userData_?.uid ? userData_.uid : 0 });
    }, []);

    const getAllVideos = useCallback(async (isSubscribe) => {
        const res = await Api.getAllVideos();
        if (isSubscribe) {
            if (res.status === 200) {
                setAllVideos(res.data.data);
            }
        }
    }, []);

    useEffect(() => {
        let isSubscribe = true;
        getVideoDetail(isSubscribe);
        return () => (isSubscribe = false);
    }, [window.location.pathname]);

    useEffect(() => {
        addView();
    }, [window.location.pathname]);

    useEffect(() => {
        getVideoComments(window.location.pathname.slice(14))
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
            {loader ?
                <Spinner />
                :
                <>
                    <div className="single-video">
                        <Header
                            isAuth_={isAuth_}
                            username={userData_.userName}
                            profileUrl={userData_.profileUrl}
                        />
                        <div className="content-wrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 col-xs-12 col-sm-12">
                                        <div className="">
                                            {
                                                videoData?.categoryName === "talent"
                                                    && videoData.filetype === "img" ?
                                                    <Carousel
                                                        responsive={RESPONSIVE}
                                                    >
                                                        {videoData?.talent_files && videoData?.talent_files.map(item => (
                                                            <div className="video__detail__img">
                                                                <img src={item.url} alt="" />
                                                            </div>
                                                        ))}
                                                    </Carousel>
                                                    :
                                                    <Player
                                                        playsInline
                                                        poster={videoData?.thumbnailUrl}
                                                        src={videoData?.assetUrl}
                                                    />
                                            }
                                            <h1><a>{videoData.title}</a></h1>
                                            <p className="video__title__views">
                                                <small>
                                                    <span>{videoData.watchCount} views&nbsp;.</span> &nbsp;
                                                    <span>{moment(videoData.createdAt).fromNow()}</span>
                                                </small>
                                            </p>
                                        </div>
                                        <div className="author clearfix">
                                            <Author
                                                uid={videoData?.uid}
                                                myUid={userData_?.uid}
                                                userName={videoData?.user?.userName}
                                                profileUrl={videoData?.user?.profileUrl}
                                                isFollow={isFollow}
                                                followUser={followUser}
                                            />
                                            <div className="author-border"></div>
                                            <ViewShare
                                                aid={videoData?.aid}
                                                uid={userData_?.uid}
                                                likes={videoData?.likeCount}
                                                isLike={isLike}
                                                likeVideo={likeVideo}
                                                handleOpen={handleOpen}
                                            />
                                            <br />
                                        </div>
                                        <div className="info">
                                            <InfoContent
                                                categoryName={videoData?.categoryName}
                                                description={videoData?.description}
                                            />
                                            <div className="showless hidden-xs">
                                                <a>Tell Us What You Think</a>
                                            </div>
                                            <div className="caption hidden-xs">
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="single-v-footer">
                                                <Comments
                                                    uid={userData_.uid}
                                                    profileUrl={userData_.profileUrl}
                                                    allComments={allComments}
                                                    addVideoComment={addVideoComment}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-xs-12 col-sm-12" style={{ marginBottom: "40px" }}>
                                        <div className="caption">
                                            <div className="left">
                                                <a>Up Next</a>
                                            </div>
                                            <div className="right">
                                                <a>
                                                    <Switch {...label} color="secondary" />
                                                </a>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <VideoList allVideos={allVideos} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                    <ShareModal
                        aid={videoData?.aid}
                        open={open}
                        handleClose={handleClose}
                    />
                </>
            }
        </>
    )
}

const Author = ({ uid, myUid, profileUrl, userName, followUser, isFollow }) => {
    return (
        <div className="author-head ls_avatar-img">
            <Link to={`/channel/${uid}`}>
                <img
                    src={profileUrl}
                    alt="Admin" className="sv-avatar" /></Link>
            <div className="sv-name">
                <div>
                    <Link to={`/channel/${uid}`}>{userName}</Link>
                    <small>
                        <span>{isFollow.count} followers</span>
                    </small>
                </div>
                {myUid !== uid &&
                    <span
                        onClick={() => followUser(uid)}
                        className="c-f btn follow-btn ">
                        {isFollow.isFollow ? 'Unfollow' : 'Follow'}
                    </span>
                }
            </div>
        </div>
    )
}

const ViewShare = ({ handleOpen, likeVideo, uid, aid, isLike }) => {
    return (
        <div className="sv-views">
            <div className="sv-views-count d-flex">
                <a style={{ color: isLike.isLike ? "#ad00ea" : '' }} className="btn" onClick={() => likeVideo(uid, aid)}>
                    <i className="fa fa-thumbs-up"
                        style={{ fontSize: '1.2em' }}></i>
                    <small id="totalLikeshow"> {isLike.count} Likes</small>
                </a>
                <a onClick={handleOpen} className="btn" >
                    <i className="fa fa-share"
                        style={{ fontSize: '1.2em', marginRight: '7px' }}></i>
                    <small id="totalLikeshow">Share</small>
                </a>
            </div>
            <div className="sv-views-progress">
                <div className="sv-views-progress-bar ls_progress-bar"></div>
            </div>
        </div>
    )
}

const InfoContent = ({ categoryName, description }) => {
    return (
        <div className="info-content">
            <h4>Category </h4>
            <p>{categoryName}</p>
            <h4>Description </h4>
            <p>{description}</p>
            <div className="row date-lic">
                <div className="col-xs-6">
                    <h4>License:</h4>
                    <p>Standard</p>
                </div>
            </div>
        </div>
    )
}

const Comments = ({ uid, profileUrl, allComments, addVideoComment }) => {
    const [comment, setComment] = useState('');
    return (
        <div className="comments">
            <div className="reply-comment">
                <div className="rc-header"><i className="cv cvicon-cv-comment"></i> <span
                    className="semibold">{allComments.count}</span> Comments</div>
                <div className="rc-ava"><a><img src={profileUrl} /></a>
                </div>
                <div className="rc-comment">
                    <form id="commentStore"
                        onSubmit={(e) => addVideoComment(e, uid, window.location.pathname.slice(14), comment.trim())}
                    >
                        <textarea
                            id="body" rows="3"
                            onChange={(e) => setComment(e.target.value)}
                            required placeholder="Share what you think?"></textarea>
                        <button type="submit">
                            <i className="cv cvicon-cv-add-comment"></i>
                        </button>
                    </form>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="comments-list" id="commentList">
                {allComments.comments && allComments.comments.map(item => (
                    <div className="d-flex" key={item.kid}>
                        <div className="comment__user__img"><img src={item.user.profileUrl} alt="" /></div>
                        <div className="comment__info">
                            <div className="comment__username">
                                {item.user.userName} <span>{moment(item.createdAt).fromNow()}</span>
                            </div>
                            <div className="comment__content">{item.message}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="clearfix"></div>
        </div>
    )
}

const VideoList = ({ allVideos }) => {
    return (
        <div className="list">
            {allVideos && allVideos.map(item => (
                <div className="h-video row" key={item.aid}>
                    <div className="col-lg-6 col-sm-6">
                        <div className="v-img ls_video-thumbnail">
                            <a href={`/video-detail/${item.aid}`}><img src={item.thumbnailUrl} alt="" /></a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-6 pl-0">
                        <div className="v-desc">
                            <a href={`/video-detail/${item.aid}`}>{item.title}</a>
                        </div>
                        <div className="v-views">
                            <span>{item.watchCount} views&nbsp;.</span> &nbsp;
                            <span>{moment(item.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            ))}
        </div>
    )
}

export default Video