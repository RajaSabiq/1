import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"
import login from '../../assets/images/login.jpg'
import Api from "../../api/api"
import { Notifications } from "../../helper/notifications"

const Reset = () => {
    const history = useHistory()
    const [data, SetData] = useState({ code: '', password: '', confirmPassword: '' });

    const resetFormHandler = async (e) => {
        e.preventDefault();
        if (data.password !== data.confirmPassword) {
            Notifications('warning', 'Confirm Password not matched');
        } else {
            const res = await Api.resetPassword(data);
            if (res.status === 200) {
                Notifications('success', res.data.message);
                history.push('/login')
            }
        }
    }

    const inputHandler = (e) => {
        SetData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
                                        <label htmlFor="code">Code</label>
                                        <input
                                            id="code"
                                            type="number"
                                            className="form-control"
                                            name="code"
                                            onChange={inputHandler}
                                            required
                                            autoFocus
                                            placeholder="000000"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={inputHandler}
                                            required
                                            placeholder="000000"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            className="form-control"
                                            name="confirmPassword"
                                            onChange={inputHandler}
                                            required
                                            placeholder="000000"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-cv1">Change Password</button>
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

export default Reset