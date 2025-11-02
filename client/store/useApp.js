import { create } from "zustand";
import axios from "../libs/axios";
import toast from "react-hot-toast";

const useApp = create((set, get) => ({
    isgettingSettings: false,
    isBlogging: false,
    isDownloading: false,
    isSubscribing : false,
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
    } ,
     
    subscribedEmail : async(email,showmessage) => {
        try {
            set({isSubscribing : true})
            const res = await axios.post("/auth/subscribed-email",{email})
           if(res?.data?.success) {
             toast.success(res?.data?.message)
           }else {
            toast.error(res?.data?.message)
           }
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        }finally {
            set({isSubscribing : false})
        }
    }
}));

export default useApp;
