import { useEffect } from "react"
import Footer from "../../components/footer/footer"
import Header from "../../components/header/header"
import { useRecoilValue } from "recoil"
import { isAuth, userData } from "../../data/atom"

const Contact = () => {
    const isAuth_ = useRecoilValue(isAuth)
    const userData_ = useRecoilValue(userData)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header
                isAuth_={isAuth_}
                username={userData_.userName}
                profileUrl={userData_.profileUrl}
            />
            <section className="ls_py-40">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <form className="ls_contact-form">
                                <h1>Get in touch!</h1>
                                <ul className="ls_p-0">
                                    <li>
                                        <div className="grid grid-2">
                                            <input name="name" type="text" placeholder="Name" required />
                                            <input name="email" type="email" placeholder="Email" required />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid grid-2">
                                            <input name="phone" type="tel" placeholder="Phone" />
                                            <input name="website" type="text" placeholder="Website" />
                                        </div>
                                    </li>
                                    <li>
                                        <textarea name="message" placeholder="Message"></textarea>
                                    </li>
                                    <li>
                                        <div className="grid grid-3">
                                            <div className="required-msg">REQUIRED FIELDS</div>
                                            <button className="btn-grid" type="submit">SUBMIT</button>
                                        </div>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact