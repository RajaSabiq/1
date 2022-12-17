import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"
import login from '../../assets/images/login.jpg'
import Api from "../../api/api"
import { Notifications } from "../../helper/notifications"

const Forgot = () => {
    const history = useHistory()
    const [email, SetEmail] = useState({ email: '' })

    const resetFormHandler = async (e) => {
        e.preventDefault();
        const res = await Api.forgotPassword(email);
        if (res.status === 200) {
            Notifications('success', res.data.message);
            history.push('/reset-password');
        }
    }

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
                        <div className="login-window reset-form">
                            <div className="l-head"> Reset Your Password</div>
                            <div className="l-form">
                                <form onSubmit={resetFormHandler}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            onChange={(e) => SetEmail((prev) => ({ email: e.target.value }))}
                                            required
                                            autoFocus
                                            placeholder="sample@gmail.com"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <button type="submit" className="btn btn-cv1">Send Email</button>
                                        </div>
                                        <div className="text-center">
                                            <div className="col-lg-1 ortext">or</div>
                                            <div className="col-lg-4 signuptext"><Link to="/login">Sign In</Link></div>
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

export default Forgot