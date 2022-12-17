import VideoHeader from "./components/video_header"
import Video from "./video/video"

const Videos = ({ showFilter, videoHeader, data, setSortKey }) => {
    return (
        <div className="content-block head-div">
            <VideoHeader
                showFilter={showFilter}
                videoHeader={videoHeader}
                setSortKey={setSortKey}
            />
            <div className="cb-content videolist">
                <div className="row">
                    {data && data.length > 0 ?
                        data.map(item => (
                            <Video
                                id={item.aid}
                                profileUrl={item.user.profileUrl}
                                title={item.title}
                                thumbnailUrl={item.thumbnailUrl}
                                watchCount={item.watchCount}
                                createdAt={item.createdAt}
                            />
                        ))
                        : 'No Data Found'
                    }
                </div>
            </div>
        </div>
    )
}

export default Videos