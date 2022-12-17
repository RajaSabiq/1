import { Link } from "react-router-dom"
import banner from '../../assets/images/banner.jpg'

const Banner = ({ isAuth_ }) => {
    return (
        <div className="ls_banner ls_d-flex ls_align-center" style={{ backgroundImage: `url(${banner}` }}>
            <div className="ls_overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center ls_text-white">
                        <h2 className="ls_title-big">
                            Let the World Hear You <br />
                            Music, Comedy, Dance, All Forms of Arts and Talents
                        </h2>
                        <div className="clearfix ls_d-flex ls_justify-center ls_py-20">
                            <p className="col-lg-8 ls_fz-18">
                                Happiness is the center of all human endeavor. Good entertainment melts away stiffen
                                sorrow to lift souls. This is why we are here. We want to stretch the limit. <br />
                                SpiceArt is a place for all latent musical talents, comedy, and other forms of arts and
                                entertainment to be seen, enjoyed, and rewarded. <br />
                                We reward artistes (upcoming and established) with 2spice tokens just for uploading
                                their work on our website for the listening/viewing pleasure of our beloved community
                                people. Get paid per like on your post.
                            </p>
                        </div>
                        {!isAuth_ && <div className="clearfix">
                            <Link to="/login" className="ls_btn ls_btn-big">SIGN IN</Link>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner