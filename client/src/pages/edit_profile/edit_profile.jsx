import Sidebar from "../../components/admin/sidebar/sidebar"
import Header from "../../components/admin/header/header"
import EditMyProfile from "../../components/admin/edit_profile/edit_profile"
import { useEffect, useState } from "react"
import { userData } from "../../data/atom"
import { useRecoilState } from "recoil"
import Api from "../../api/api"
import { Notifications } from "../../helper/notifications"
import { useHistory } from "react-router-dom"

const EditProfile = () => {
    const history = useHistory()
    const [userData_, setUserData] = useRecoilState(userData)
    const [userFormData, setUserFormData] = useState({
        uid: '',
        userName: '',
        fName: '',
        lName: '',
        profile: '',
        profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsZF0vZRu0hWNVNvT1189lraUnqcba6Eu1Nw&usqp=CAU'
    })
    const [updatePassword, setPasswordProfile] = useState({
        uid: '',
        prePassword: '',
        password: '',
        confirmPassword: '',
    });

    const setInputHandle = (e) => {
        if (e.target.name === 'profile') {
            setUserFormData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
        } else {
            setUserFormData((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
        }
    };

    const updatePasswordInputHandle = (e) => {
        setPasswordProfile((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const updatePasswordHandle = async (e) => {
        e.preventDefault();
        if (updatePassword.password === updatePassword.confirmPassword) {
            const res = await Api.updatePassword(updatePassword);
            if (res.status === 200) {
                Notifications('success', res.data.message);
                setPasswordProfile({
                    prePassword: '',
                    password: '',
                    confirmPassword: '',
                });
                history.push('/profile')
            }
        } else {
            Notifications('warning', 'Confirm Password not matched');
        }
    };

    const updateProfileHandle = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('uid', userFormData.uid);
        formData.append('profile', userFormData.profile);

        if (userFormData.profile) {
            const res2 = await Api.updateProfilePic(formData)
            if (res2.status === 200) {
                setUserFormData((prev) => ({
                    ...prev,
                    profileUrl: res2.data.user.profileUrl,
                    profile: ''
                }))
            }
        }

        const res = await Api.updateProfile(userFormData);
        if (res.status === 200) {
            setUserData(res.data.user)
            localStorage.setItem('user', JSON.stringify(res.data.user));
            Notifications('success', res.data.message)
            history.push('/profile')
        }
    };

    useEffect(() => {
        setUserFormData((prev) => ({
            uid: userData_.uid,
            userName: userData_.userName,
            fName: userData_.fName,
            lName: userData_.lName,
            profileUrl: userData_.profileUrl ,
        }));
        setPasswordProfile((prev) => ({ ...prev, uid: userData_.uid }))
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="admin">
            <Sidebar />
            <div className="admin__dashboardPanel my__profile">
                <Header
                    username={userData_.userName}
                    profileUrl={userData_.profileUrl}
                />
                <div className='admin__dashboard'>
                    <div className="dashboard__cont">
                        <EditMyProfile
                            userFormData={userFormData}
                            setInputHandle={setInputHandle}
                            updateProfileHandle={updateProfileHandle}
                            updatePassword={updatePassword}
                            updatePasswordInputHandle={updatePasswordInputHandle}
                            updatePasswordHandle={updatePasswordHandle}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile