import { useState } from "react"
import { Link } from "react-router-dom"
import ProfileDrop from "../profile_drop/profile_drop"
import Sidebar from "../sidebar/sidebar"
import SearchForm from "./components/search_form"
import logo from '../../assets/images/logo.png'

const Header = ({ isAuth_, username, profileUrl }) => {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      <header className="ls_bg-dark ls_header">
        <div className="container-fluid">
          <div className="row ls_d-flex ls_align-center">
            <div className="col-xs-5 ls_d-flex ls_align-center">
              <div className="ls_logo">
                <Link className="" to="/">
                  <img src={logo} alt="" className="img-responsive" />
                  <span></span>
                </Link>
              </div>
              <div className="ls_w-100 ls_d-flex ls_justify-center">
                <ul className="list-inline menu ls_m-0 ls_menu ls_d-md-none">
                  <li className=""><Link to="/category/music">Music</Link></li>
                  <li className=""><Link to="/category/comedy">Comedy</Link></li>
                  <li className=""><Link to="/category/talent">Talent</Link></li>
                  <li className=""><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-xs-4">
              <SearchForm formClass={'ls_d-md-none'} />
            </div>
            <div className="col-xs-3 ls_d-flex ls_justify-end">
              <div className="ls_d-flex ls_align-center ls_d-md-none">
                {
                  !isAuth_ ?
                    < ul className="list-inline menu ls_m-0 ls_menu ls_text-white">
                      <li className="ls_px-0">
                        <Link to="/login" className="ls_px-0 ls_fw-600">Sign In</Link>
                      </li>
                      <li className="ls_px-0"><span>/</span></li>
                      <li className="ls_px-0">
                        <Link className="ls_px-0 ls_fw-600">Sign up</Link>
                      </li>
                    </ul>
                    :
                    <>
                      <ProfileDrop
                        username={username}
                        profileUrl={profileUrl}
                      />
                      <Link to="/admin/upload" className="ls_btn" style={{ marginLeft: '7px' }}>
                        <img src="https://art.2spice.link/assets/frontend/images/upload.svg" alt="upload" />
                        Upload
                      </Link>
                    </>
                }
              </div>
              <a onClick={() => setShowSearchBar(prev => !prev)}
                style={{ cursor: 'pointer' }}
                className="ls_d-none ls_d-md-block ls_text-white ls_mr-10">
                {showSearchBar ?
                  <i className="fa fa-close ls_color-primary"></i> :
                  <i className="fa fa-search ls_color-primary"></i>
                }
              </a>
              <a onClick={() => setShowSidebar(prev => !prev)}
                className="btn-menu-toggle ls_m-0 ls_d-none ls_d-md-block ls_text-white"><i className="cv cvicon-cv-menu"></i></a>
            </div>
          </div>
        </div>
      </header>

      {
        showSearchBar &&
        <div className="container-fluid ls_mob-search" id="ls_form-expand">
          <SearchForm />
        </div>
      }
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        isAuth_={isAuth_}
        username={username}
        profileUrl={profileUrl}
      />
    </>
  )
}

export default Header