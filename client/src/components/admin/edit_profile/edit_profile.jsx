import { useState } from 'react'
import './edit_profile.css'

const EditProfile = ({ userFormData, setInputHandle, updateProfileHandle, updatePassword, updatePasswordInputHandle, updatePasswordHandle }) => {

    return (
        <>
            <div className='user__profile__cont edit__profile_cont'>
                <div className="user__profile__wrapper">
                    <div className="user__profile_header">
                        <p><strong>Edit profile</strong></p>
                    </div>
                    <div className="edit__profile__form">
                        <form onSubmit={updateProfileHandle} >
                            <div className="edit__input__wrapper">
                                <label htmlFor="edit_image">Avatar</label>
                                <input
                                    type="file"
                                    id="edit_image"
                                    name='profile'
                                    onChange={setInputHandle}
                                    accept='.png,.jpg,.jpeg,.gif'
                                />
                            </div>
                            <div className="edit__input__wrapper">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    value={userFormData.userName}
                                    name='userName'
                                    onChange={setInputHandle}
                                    required
                                />
                            </div>
                            <div className="edit__input__wrapper">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name='fName'
                                    required
                                    value={userFormData.fName}
                                    onChange={setInputHandle}
                                />
                            </div>
                            <div className="edit__input__wrapper">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name='lName'
                                    required
                                    value={userFormData.lName}
                                    onChange={setInputHandle}
                                />
                            </div>
                            <div className="edit__input__wrapper">
                                <button type='submit'>Edit Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
                <br />
                <br />
                <div className="user__profile__wrapper">
                    <div className="user__profile_header">
                        <p><strong>Change Password</strong></p>
                    </div>
                    <div className="edit__profile__form">
                        <form onSubmit={updatePasswordHandle}>
                            <div className="edit__input__wrapper">
                                <label>Old Password</label>
                                <input
                                    name='prePassword'
                                    type="password"
                                    value={updatePassword.prePassword}
                                    onChange={updatePasswordInputHandle}
                                    required
                                />
                            </div>
                            <div className="edit__input__wrapper">
                                <label>New Password</label>
                                <input
                                    name='password'
                                    type="password"
                                    value={updatePassword.password}
                                    onChange={updatePasswordInputHandle}
                                    required
                                />
                            </div>
                            <div className="edit__input__wrapper">
                                <label>Confirm Password</label>
                                <input
                                    name='confirmPassword'
                                    type="password"
                                    value={updatePassword.confirmPassword}
                                    onChange={updatePasswordInputHandle}
                                    required
                                />
                            </div>
                            <div className="edit__input__wrapper">
                                <button type='submit'>Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile