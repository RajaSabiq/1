import axios from 'axios';
import Cookies from 'js-cookie';
import { Notifications } from '../helper/notifications';
import { errorHandler } from '../helper/errorhandler';

const JWT_STORAGE_NAME = 'token';
axios.defaults.baseURL = 'http://localhost:4000';

const getJwt = () => localStorage.getItem(JWT_STORAGE_NAME);
const setJwt = (token) => {
    Cookies.set(JWT_STORAGE_NAME, token, {
        expires: 7,
        path: '/',
        secure: false,
    });
    localStorage.setItem(JWT_STORAGE_NAME, token)
};

const setAuthHeader = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setJwt(token);
};

if (getJwt()) {
    setAuthHeader(getJwt());
}

export default class Api {

    //login
    static userLogin = async (data) => {
        try {
            const res = await axios.post(`/api/v1/user-login`, data);
            setAuthHeader(res.data.token);
            return res;
        } catch (error) {
            localStorage.removeItem(JWT_STORAGE_NAME)
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //updateProfile
    static updateProfile = async (data) => {
        try {
            const res = await axios.post(`/api/v1/user-update-profile-dashboard`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //updateProfilePic
    static updateProfilePic = async (data) => {
        try {
            const res = await axios.post(`/api/v1/user-update-profile-picture`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //updatePassword
    static updatePassword = async (data) => {
        try {
            const res = await axios.post(`/api/v1/user-change-password-dashboard`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //forgotPassword
    static forgotPassword = async (data) => {
        try {
            const res = await axios.post(`/api/v1/user-forgot-password`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //resetPassword
    static resetPassword = async (data) => {
        try {
            const res = await axios.post(`/api/v1/user-change-password`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //getAllVideos
    static getAllVideos = async () => {
        try {
            const res = await axios.get(`/api/v1/all-content`);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //getSingleVideo
    static getSingleVideo = async (data) => {
        try {
            const res = await axios.post(`/api/v1/content-by-aid`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //getAllVideosByCategoryName
    static getAllVideosByCategoryName = async (data) => {
        try {
            const res = await axios.post(`/api/v1/content-by-cname`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //getAllVideosBySearchName
    static getAllVideosBySearchName = async (data) => {
        try {
            const res = await axios.post(`/api/v1/content-by-search`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //getAllVideosByUser
    static getAllVideosByUser = async (data) => {
        try {
            const res = await axios.post(`/api/v1/all-content-by-uid`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //addView
    static addView = async (data) => {
        try {
            const res = await axios.post(`/api/v1/add-view`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //followUser
    static followUser = async (data) => {
        try {
            const res = await axios.post(`/api/v1/follow`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //getFollowUser
    static getFollowUser = async (data) => {
        try {
            const res = await axios.post(`/api/v1/follow-by-uid`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //likeVideo
    static likeVideo = async (data) => {
        try {
            const res = await axios.post(`/api/v1/like-content`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //getVideoLikes
    static getVideoLikes = async (data) => {
        try {
            const res = await axios.post(`/api/v1/likes-by-aid`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //addVideoComment
    static addVideoComment = async (data) => {
        try {
            const res = await axios.post(`/api/v1/add-comment`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //getVideoComments
    static getVideoComments = async (data) => {
        try {
            const res = await axios.post(`/api/v1/comment-by-aid`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //getVideoComments
    static uploadContent = async (data) => {
        try {
            const res = await axios.post(`/api/v1/add-content`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };

    //deleteVideo
    static deleteVideo = async (data) => {
        try {
            const res = await axios.post(`/api/v1/delete-content`, data);
            return res;
        } catch (error) {
            errorHandler(error.response.data);
            return error.response.data;
        }
    };
}