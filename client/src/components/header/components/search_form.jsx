import { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import Api from "../../../api/api";

const SearchForm = ({ formClass }) => {
    const history = useHistory()
    const [search, setSearch] = useState('');
    const [allVideos, setAllVideos] = useState([])
    const [searchVideos, setSearchVideos] = useState([])

    const getAllVideos = useCallback(async (isSubscribe) => {
        const res = await Api.getAllVideos();
        if (isSubscribe) {
            if (res.status === 200) {
                setAllVideos(res.data.data);
            }
        }
    }, []);

    const searchHandler = (e) => {
        e.preventDefault();
        if (search.length > 0) {
            history.push(`/search/${search}`)
            setSearch('')
        }
    }

    const searchInputHandler = (e) => {
        setSearch(e.target.value)
        if (e.target.value.length > 0) {
            let data = allVideos.filter(item => item.title.includes(e.target.value))
            setSearchVideos(data)
        } else {
            setSearchVideos([])
        }
    }

    useEffect(() => {
        let isSubscribe = true;
        getAllVideos(isSubscribe);
        return () => (isSubscribe = false);
    }, []);

    return (
        <>
            <form className={formClass} onSubmit={searchHandler}>
                <div className="topsearch ls_m-0" >
                    <i className="cv cvicon-cv-cancel topsearch-close"></i>
                    <div className="input-group">
                        <span onClick={searchHandler} className="input-group-addon" id="sizing-addon2"><i
                            className="fa fa-search ls_color-primary"></i></span>
                        <input
                            value={search}
                            type="text"
                            onChange={searchInputHandler}
                            className="form-control"
                            placeholder="Search for artists, song, albums!"
                        />
                        <div className="input-group-btn">
                            <div className="btn btn-default"></div>
                        </div>
                    </div>
                </div>
            </form>
            {searchVideos && searchVideos.length > 0 ?
                <div id="searchResultDiv" style={{ position: 'absolute', zIndex: 1, width: ' 95%' }}>
                    <ul className="list-group">
                        {searchVideos.map(item => (
                            <a href={`/video-detail/${item.aid}`} className="list-group-item">{item.title}</a>
                        ))}
                    </ul>
                </div>
                :
                ''
            }
        </>
    )
}

export default SearchForm