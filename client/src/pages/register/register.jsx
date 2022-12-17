import { useEffect } from "react"
import { Link } from "react-router-dom"
import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"
import login from '../../assets/images/login.jpg'

const Register = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Header />
            <div className="container-fluid bg-image">
                <div className="row">
                    <div className="login-wraper">
                        <div className="hide-bg hidden-xs">
                        <img src={login} alt="" />
                        </div>
                        <div className="banner-text hidden-xs">
                            <div className="line"></div>
                            <div className="b-text">
                                Watch <span className="color-active">millions<br /> of</span> <span className="color-b1">v</span><span
                                    className="color-b2">i</span><span className="color-b3">de</span><span
                                        className="color-active">os</span>
                                for free.
                            </div>
                            <div className="overtext">
                                Over 6000 videos uploaded Daily.
                            </div>
                        </div>
                        <div className="login-window" style={{top:'35%'}}>
                            <div className="l-head">
                                Sign Up for Free
                            </div>
                            <div className="l-form">
                                <form >
                                    <div className="form-group">
                                        <label htmlFor="name">Username</label>
                                        <input id="name" type="text" className="form-control" name="name" required
                                            autoFocus placeholder="johndoe" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="first_name">First Name</label>
                                        <input id="first_name" type="text" className="form-control" name="first_name"
                                            required placeholder="John" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="last_name">Last Name</label>
                                        <input id="last_name" type="text" className="form-control" name="last_name"
                                            required placeholder="Doe" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input id="email" type="email" className="form-control" name="email" required
                                            placeholder="sample@gmail.com" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input id="password" type="password" className="form-control" name="password" required
                                            placeholder="**********" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password-confirm">Re-type Password</label>
                                        <input id="password-confirm" type="password" className="form-control"
                                            name="password_confirmation" required placeholder="**********" />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <button type="submit" className="btn btn-cv1">Sign Up</button>
                                        </div>
                                        <div className="hidden-xs text-center">
                                            <div className="col-lg-1 ortext">or</div>
                                            <div className="col-lg-4 signuptext"><Link to="/login">Log In</Link></div>
                                        </div>
                                    </div>

                                    <div className="visible-xs text-center mt-30">
                                        <span className="forgottext"><Link to="/login">Already have an account?</Link></span>
                                        <span className="signuptext"><Link to="/login">Login here</Link></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register