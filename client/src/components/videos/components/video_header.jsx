const VideoHeader = ({ showFilter, videoHeader,setSortKey }) => {
    return (
        <div className="cb-header">
            <div className="row">
                <div className="col-xs-12 ls_d-flex ls_align-center ls_justify-between">
                    <ul className="list-inline">
                        <li>
                            <a className="ls_color-primary">
                                <span style={{ textTransform: 'capitalize' }}>{videoHeader}</span>
                            </a>
                        </li>
                    </ul>
                    {showFilter && <div className="btn-group pull-right">
                        <a className="btn dropdown-toggle ls_color-primary"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>Sort By</span>
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            {["Latest", "Mostly Viewed", "Mostly Liked"].map((item, index) => (
                                <li onClick={()=>setSortKey(index)}><a>{item}</a></li>
                            ))}
                        </ul>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default VideoHeader