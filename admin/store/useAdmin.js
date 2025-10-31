import { create } from "zustand";
import axios from "../libs/axios";

const useAdminStore = create((set, get) => ({
    admin: JSON.parse(localStorage.getItem("echoda-admin")) || null,
    isSigningIn: false,

    loginNow: async (data, showMessage, navigate) => {
        try {
            set({ isSigningIn: true });
            const res = await axios.post("/login", data);
            if (!res?.data.success) {
                showMessage(res?.data?.message, false);
                return;
            }
            localStorage.setItem(
                "echoda-admin",
                JSON.stringify(res?.data?.user)
            );
            showMessage(res?.data?.message, true);
            setTimeout(() => {
                navigate("/dashboard");
                set({admin:res?.data?.user})
            }, 1500);
        } catch (error) {
            showMessage(error?.response?.data?.message, false);
        } finally {
            set({ isSigningIn: false });
        }
    },
    isAuth : async()=>{
        try {
           const res = axios.get("/is-admin")
           if(res?.data?.success){
               console.log(res.data);
           }
        } catch (err) {
            console.error('Error:', err);
            
        }
    },
    logout : async()=>{
        try{
            const res = await axios.post("/logout")
            if(res?.data?.success){
                localStorage.removeItem("echoda-admin")
                set({admin: null})
            }
        }catch(error){
            console.log(error)
        }
    }
}));

export default useAdminStore;
