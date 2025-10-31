import { create } from "zustand";
import axios from "../libs/axios";

const useApp = create((set, get) => ({
    isgettingSettings: false,
    isBlogging: false,
    isDownloading: false,
    settings: {},
    blogs: [],
    flyers: [],

    getSettings: async () => {
        try {
            set({ isgettingSettings: true });
            const res = await axios.get("/admin/get-settings");
            set({ settings: res.data });
        } catch (error) {
            console.log(error?.response?.data?.message);
        } finally {
            set({ isgettingSettings: false });
        }
    },
    getBlogs: async () => {
        try {
            set({ isBlogging: true });
            const res = await axios.get("/admin/view-blog-list");
            set({ blogs: res.data?.blogs });
        } catch (error) {
            console.log(error?.response?.data?.message);
        } finally {
            set({ isBlogging: false });
        }
    },
    getFlyers: async () => {
        try {
            set({ isBlogging: true });
            const res = await axios.get("/admin/view-flyer-list");
            if (res?.data?.success) {
                if (res?.data?.flyers?.length > 0) {
                    set({ flyers: res?.data?.flyers });
                }
            }
        } catch (error) {
            console.log(error?.response?.data?.message);
        } finally {
            set({ isBlogging: false });
        }
    },
    downloadFlyer: async (id, navigate) => {
        try {
            set({ isDownloading: true });
            const res = await axios.get("/admin/download-flyer/" + id);
            if (res?.data?.success) {
                window.location.href=res?.data?.link
                
            }else {
                alert("Please login!")
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            set({ isDownloading: false });
        }
    }
}));

export default useApp;
