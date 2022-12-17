import { Link } from "react-router-dom"
import moment from 'moment'

const Video = ({ id, profileUrl, title, thumbnailUrl, watchCount, createdAt }) => {
    return (
        <div className="col-lg-3 col-sm-6 videoitem mx-2" key={id}>
            <div className="b-video">
                <div className="v-img">
                    <Link to={`/video-detail/${id}`}>
                        <img
                            src={thumbnailUrl} alt="" width="100%"
                            height="215px" className="ls_obj-cover" />
                    </Link>
                </div>
                <div className="ls_height-1 v-desc">
                    <div className="channel__image">
                        <img src={profileUrl} alt="" />
                    </div>
                    <div className="video__desc">
                        <Link to={`/video-detail/${id}`}>{title}</Link>
                        <div className="video__views__likes">
                            <span>{watchCount} views&nbsp;.</span> &nbsp;
                            <span>{moment(createdAt).fromNow()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video