import { atom } from "recoil";

export const sidebarDisp = atom({
    key: "sidebar",
    default: false
});

export const userData = atom({
    key: "user data",
    default: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
});

export const isAuth = atom({
    key: "isAuth",
    default: localStorage.getItem("user") ? true : false
});
