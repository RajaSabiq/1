import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import Api from "../../api/api"
import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"
import { isAuth, userData } from "../../data/atom"
import login from '../../assets/images/login.jpg'

const Login = () => {
    const history = useHistory()
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const setUserData = useSetRecoilState(userData)
    const setIsAuth = useSetRecoilState(isAuth)

    const loginFormHandler = async (e) => {
        e.preventDefault();
        const res = await Api.userLogin(loginForm);
        if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUserData(res.data.user)
            setIsAuth(true)
            setLoginForm({ email: '', password: '' });
            history.push('/');
        } else {
            setLoginForm({ email: '', password: '' });
        }
    }

    const setInputHandle = (e) => {
        setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <div className="container-fluid bg-image">
                <div className="row">
                    <div className="login-wraper">
                        <div className="hide-bg">
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
                        <div className="login-window">
                            <div className="l-head">
                                Log Into Your Account
                            </div>
                            <div className="l-form">
                                <form onSubmit={loginFormHandler}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            required
                                            autoFocus
                                            onChange={setInputHandle}
                                            placeholder="sample@gmail.com"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="form-control"
                                            required
                                            onChange={setInputHandle}
                                            placeholder="**********"
                                        />
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <label className="checkbox">
                                                <input type="checkbox" defaultChecked name="remember" />
                                                <span className="arrow"></span>
                                            </label> <span>Remember me on this computer</span>
                                            <span className="text2">(not recommended on public or shared computers)</span>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-cv1">Login</button>
                                        </div>
                                        <div className="text-center">
                                            {/* <div className="col-lg-1 ortext">or</div>
                                            <div className="col-lg-4 signuptext"><Link to="/register">Sign Up</Link></div> */}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-center col-lg-12 forgottext">
                                            <Link to="/reset">Forgot Password?</Link>
                                        </div>
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

export default Login