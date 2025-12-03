import { create } from "zustand";
import axios from "../libs/axios";

const useApi = create((set, get) => ({
  isSaving: false,
  isCreating: false,
  isEditing: false,
  isDeleting: false,
  isgettingSettings: false,
  isFetchingBlogs: false,
  adminSettings: {},
  blogs: [],
  flyers: [],

  createBlog: async (data, showMessage, navigate) => {
    try {
      set({ isSaving: true });
      const res = await axios.post("/create-blog", data);
      if (res?.data?.success) {
        showMessage(res?.data?.message, true);
        navigate("/view-blogs");
      } else {
        showMessage(res?.data?.message, false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message, false);
    } finally {
      set({ isSaving: false });
    }
  },
  editBlog: async (data, id, showMessage, navigate) => {
    try {
      set({ isSaving: true });
      const res = await axios.put("/update-blog/" + id, data);
      if (res?.data?.success) {
        showMessage(res?.data?.message, true);
        await get().getBlogs();
        navigate("/view-blogs");
      } else {
        showMessage(res?.data?.message, false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message, false);
    } finally {
      set({ isSaving: false });
    }
  },
  getBlogs: async () => {
    try {
      set({ isFetchingBlogs: true });
      const res = await axios.get("/view-blog-list");
      if (res?.data?.success) {
        if (res?.data?.blogs?.length > 0) {
          set({ isFetchingBlogs: false });
          set({ blogs: res?.data?.blogs });
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.message, false);
    } finally {
      set({ isFetchingBlogs: false });
    }
  },
  getFlyers: async () => {
    try {
      set({ isFetchingBlogs: true });
      const res = await axios.get("/view-flyer-list");
      if (res?.data?.success) {
        if (res?.data?.flyers?.length > 0) {
          set({ flyers: res?.data?.flyers });
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.message, false);
    } finally {
      set({ isFetchingBlogs: false });
    }
  },
  saveHeroData: async (data, showMessage) => {
    try {
      set({ isSaving: true });
      const res = await axios.post("/save-hero", data);
      if (res?.data?.success) {
        showMessage(res?.data?.message, true);
      } else {
        showMessage(res?.data?.message, false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message, false);
    } finally {
      set({ isSaving: false });
    }
  },
  saveAboutData: async (data, showMessage) => {
    try {
      set({ isSaving: true });
      const res = await axios.post("/save-settings", data);
      if (res?.data?.success) {
        showMessage(res?.data?.message, true);
      } else {
        showMessage(res?.data?.message, false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message, false);
    } finally {
      set({ isSaving: false });
    }
  },
  createTeam: async (data, showMessage, navigate) => {
    try {
      set({ isCreating: true });
      const res = await axios.post("/create-team", data);
      if (res?.data?.success) {
        showMessage(res?.data?.message, true);
        naviagate("/view-team-members");
      } else {
        showMessage(res?.data?.message, false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message, false);
    } finally {
      set({ isCreating: false });
    }
  },
  createFlyer: async (data, showMessage) => {
    try {
      set({ isCreating: true });
      const res = await axios.post("/create-flyer", data);
      if (res?.data?.success) {
        showMessage(res?.data?.message, true);
        set({ flyers: res?.data?.updatedFlyer });
      } else {
        showMessage(res?.data?.message, false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message, false);
    } finally {
      set({ isCreating: false });
    }
  },
  editFlyer: async (data, id, showMessage) => {
    try {
      set({ isCreating: true });
      const res = await axios.put("/edit-flyer/" + id, data);
      if (res?.data?.success) {
        showMessage(res?.data?.message, true);
        set({ flyers: res?.data?.updatedFlyer });
      } else {
        showMessage(res?.data?.message, false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message, false);
    } finally {
      set({ isCreating: false });
    }
  },
  editTeam: async (name, data, showMessage) => {
    try {
      set({ isEditing: true });
      const res = await axios.put("/edit-team-members/" + name, data);
      if (res?.data?.success) {
        showMessage(res?.data?.message, true);
      } else {
        showMessage(res?.data?.message, false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message, false);
    } finally {
      set({ isEditing: false });
    }
  },
  deleteTeam: async (name, target) => {
    try {
      set({ isDeleting: true });
      const res = await axios.delete("/delete-team-members/" + name);
      if (res?.data?.success) {
        target.remove();
      } else {
        console.log(res?.data?.message);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      set({ isDeleting: false });
    }
  },
  deleteBlog: async (id, target) => {
    try {
      set({ isDeleting: true });
      const res = await axios.delete("/delete-blog/" + id);
      if (res?.data?.success) {
        target.remove();
      } else {
        console.log(res?.data?.message);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      set({ isDeleting: false });
    }
  },
  deleteFlyer: async (id, target) => {
    try {
      set({ isDeleting: true });
      const res = await axios.delete("/delete-flyer/" + id);
      if (res?.data?.success) {
        target.remove();
      } else {
        console.log(res?.data?.message);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      set({ isDeleting: false });
    }
  },
  getSettings: async () => {
    try {
      set({ isgettingSettings: true });
      const res = await axios.get("/get-settings");
      set({ adminSettings: res.data });
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      set({ isgettingSettings: false });
    }
  },
}));

export default useApi;
