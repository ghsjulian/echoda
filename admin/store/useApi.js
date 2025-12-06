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
        showMessage(res?.data?.message || "Failed to create blog", false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message || error.message || "Upload failed", false);
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
        showMessage(res?.data?.message || "Failed to update blog", false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message || error.message || "Update failed", false);
    } finally {
      set({ isSaving: false });
    }
  },

  getBlogs: async () => {
    try {
      set({ isFetchingBlogs: true });
      const res = await axios.get("/view-blog-list");
      if (res?.data?.success) {
        // set blogs (even if empty array)
        set({ blogs: Array.isArray(res?.data?.blogs) ? res.data.blogs : [] });
      } else {
        // API responded but not successful — clear or keep previous depending on your needs
        set({ blogs: [] });
      }
    } catch (error) {
      // Log the error message only
      console.error(error?.response?.data?.message || error.message);
      set({ blogs: [] });
    } finally {
      set({ isFetchingBlogs: false });
    }
  },

  getFlyers: async () => {
    try {
      // re-using isFetchingBlogs flag (keeps existing state shape)
      set({ isFetchingBlogs: true });
      const res = await axios.get("/view-flyer-list");
      if (res?.data?.success) {
        set({ flyers: Array.isArray(res?.data?.flyers) ? res.data.flyers : [] });
      } else {
        set({ flyers: [] });
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
      set({ flyers: [] });
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
        showMessage(res?.data?.message || "Failed to save hero data", false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message || error.message || "Save failed", false);
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
        showMessage(res?.data?.message || "Failed to save settings", false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message || error.message || "Save failed", false);
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
        navigate("/view-team-members");
      } else {
        showMessage(res?.data?.message || "Failed to create team member", false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message || error.message || "Create failed", false);
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

        // Accept either an array of flyers or a single updated flyer
        const updated = res?.data?.updatedFlyer ?? res?.data?.flyers ?? res?.data?.flyer;
        if (Array.isArray(updated)) {
          set({ flyers: updated });
        } else if (updated) {
          set((prev) => ({ flyers: [updated, ...(prev.flyers || [])] }));
        }
      } else {
        showMessage(res?.data?.message || "Failed to create flyer", false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message || error.message || "Create failed", false);
    } finally {
      set({ isCreating: false });
    }
  },

  editFlyer: async (data, id, showMessage) => {
    try {
      // editing a flyer — use isEditing flag
      set({ isEditing: true });
      const res = await axios.put("/edit-flyer/" + id, data);
      if (res?.data?.success) {
        showMessage(res?.data?.message, true);

        const updated = res?.data?.updatedFlyer ?? res?.data?.flyers ?? res?.data?.flyer;
        if (Array.isArray(updated)) {
          set({ flyers: updated });
        } else if (updated) {
          set((prev) => ({
            flyers: (prev.flyers || []).map((f) => (f._id === updated._id ? updated : f)),
          }));
        }
      } else {
        showMessage(res?.data?.message || "Failed to edit flyer", false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message || error.message || "Edit failed", false);
    } finally {
      set({ isEditing: false });
    }
  },

  editTeam: async (name, data, showMessage) => {
    try {
      set({ isEditing: true });
      const res = await axios.put("/edit-team-members/" + name, data);
      if (res?.data?.success) {
        showMessage(res?.data?.message, true);
      } else {
        showMessage(res?.data?.message || "Failed to edit team member", false);
      }
    } catch (error) {
      showMessage(error?.response?.data?.message || error.message || "Edit failed", false);
    } finally {
      set({ isEditing: false });
    }
  },

  deleteTeam: async (name, target) => {
    try {
      set({ isDeleting: true });
      const res = await axios.delete("/delete-team-members/" + name);
      if (res?.data?.success) {
        // remove DOM element if provided
        if (target && typeof target.remove === "function") target.remove();
      } else {
        console.error(res?.data?.message || "Failed to delete team member");
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
    } finally {
      set({ isDeleting: false });
    }
  },

  deleteBlog: async (id, target) => {
    try {
      set({ isDeleting: true });
      const res = await axios.delete("/delete-blog/" + id);
      if (res?.data?.success) {
        if (target && typeof target.remove === "function") target.remove();
        // also remove from state array
        set((prev) => ({ blogs: (prev.blogs || []).filter((b) => b._id !== id) }));
      } else {
        console.error(res?.data?.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
    } finally {
      set({ isDeleting: false });
    }
  },

  deleteFlyer: async (id, target) => {
    try {
      set({ isDeleting: true });
      const res = await axios.delete("/delete-flyer/" + id);
      if (res?.data?.success) {
        if (target && typeof target.remove === "function") target.remove();
        set((prev) => ({ flyers: (prev.flyers || []).filter((f) => f._id !== id) }));
      } else {
        console.error(res?.data?.message || "Failed to delete flyer");
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
    } finally {
      set({ isDeleting: false });
    }
  },

  getSettings: async () => {
    try {
      set({ isgettingSettings: true });
      const res = await axios.get("/get-settings");
      // accept several possible response shapes
      const settings = res?.data?.settings ?? res?.data?.data ?? res?.data;
      set({ adminSettings: settings || {} });
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
    } finally {
      set({ isgettingSettings: false });
    }
  },
}));

export default useApi;
