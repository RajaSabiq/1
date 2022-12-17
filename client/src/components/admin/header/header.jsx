import './header.css'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { sidebarDisp } from '../../../data/atom'
import { useState } from 'react'
import ProfileDrop from '../../profile_drop/profile_drop'

const Header = ({ username, profileUrl }) => {
  const setSidebarDisplay = useSetRecoilState(sidebarDisp)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  return (
    <div className='admin__header'>
      <div className="admin__hamburger"
        onClick={() => setSidebarDisplay(true)}
      >
        <i className="fa fa-bars"></i>
      </div>
      <ProfileDrop
        username={username}
        profileUrl={profileUrl}
      />
    </div>
  )
}

export default Header