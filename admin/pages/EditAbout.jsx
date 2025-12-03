import React, { useState, useRef, useEffect } from "react";
import "../styles/pages.style.css";
import useApi from "../store/useApi";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1 MB

const emptyState = {
  bannerImage: "", // can be URL string or base64
  aboutImage: "",
  bannerText: "",
  bannerHeading: "",
  aboutDescription: "",
};

const EditAbout = () => {
  const { isSaving, saveAboutData, adminSettings, isgettingSettings } =
    useApi();
  const settings = adminSettings?.aboutPage;

  const [data, setData] = useState(emptyState);
  const msgRef = useRef(null);
  const bannerFileRef = useRef(null);
  const aboutFileRef = useRef(null);

  const wordLimits = {
    bannerText: 15,
    bannerHeading: 8,
    aboutDescription: 100,
  };

  const showMessage = (message, isSuccess = true) => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (!msgRef.current) return;
      msgRef.current.className = isSuccess ? "success" : "error";
      msgRef.current.textContent = message;
      setTimeout(() => {
        if (!msgRef.current) return;
        msgRef.current.className = "";
        msgRef.current.textContent = "";
      }, 2500);
    } catch (e) {
      // silent fallback
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    const words = value?.trim()?.split(/\s+/) || [];
    if (words.length <= (wordLimits[name] ?? Infinity)) {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const createBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  const handleFile = async (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    const file = files[0];
    if (file.size > MAX_IMAGE_SIZE) {
      showMessage("Image must be less than 1 MB.", false);
      // reset corresponding input
      if (name === "bannerImage" && bannerFileRef.current)
        bannerFileRef.current.value = "";
      if (name === "aboutImage" && aboutFileRef.current)
        aboutFileRef.current.value = "";
      return;
    }

    try {
      const base64 = await createBase64(file);
      setData((prev) => ({ ...prev, [name]: base64 }));
    } catch (err) {
      showMessage("Failed to read image file." + err.message, false);
    }
  };

  const checkValidation = () => {
    for (const key of Object.keys(emptyState)) {
      const val = data[key];
      if (val === null || val === undefined || String(val).trim() === "") {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!checkValidation()) {
      showMessage("Please fill out the form!", false);
      return;
    }

    try {
      const result = await saveAboutData(data, showMessage);
      const success =
        result === true ||
        (result && typeof result === "object" && result.success === true);

      if (success) {
        showMessage("Saved successfully.", true);
        // reset to empty only after success
        setData(emptyState);
        if (bannerFileRef.current) bannerFileRef.current.value = "";
        if (aboutFileRef.current) aboutFileRef.current.value = "";
      } else {
        showMessage("Save failed. Please try again.", false);
      }
    } catch (err) {
      showMessage("An error occurred while saving." + err.message, false);
    }
  };

  const countWords = (text) => {
    if (!text) return 0;
    return String(text).trim().split(/\s+/).filter(Boolean).length;
  };

  useEffect(() => {
    if (isgettingSettings || !settings) return;
    // Map backend shape to local state; adapt paths if backend differs
    setData({
      bannerImage: settings?.bannerImage?.url || settings?.bannerImage || "",
      aboutImage: settings?.aboutImage?.url || settings?.aboutImage || "",
      bannerText: settings?.bannerText || "",
      bannerHeading: settings?.bannerHeading || "",
      aboutDescription: settings?.aboutDescription || "",
    });
  }, [isgettingSettings, settings]);

  return (
    <section className="edit-about">
      <h1>Edit About Page</h1>
      <span ref={msgRef} id="message"></span>
      <div className="form">
        <div className="flex">
          <label htmlFor="banner-img">Change Banner BG Image </label>
          <input
            ref={bannerFileRef}
            name="bannerImage"
            onChange={handleFile}
            type="file"
            id="banner-img"
            accept="image/*"
            hidden
          />
          {(data?.bannerImage && (
            <img
              src={data?.bannerImage?.url || data?.bannerImage}
              alt="Banner"
              style={{ maxWidth: 320, maxHeight: 200, objectFit: "cover" }}
            />
          )) || <div style={{ color: "#666" }}>No banner image</div>}
        </div>

        <div className="flex">
          <label htmlFor="about-img">Change About Image </label>
          <input
            ref={aboutFileRef}
            name="aboutImage"
            onChange={handleFile}
            type="file"
            id="about-img"
            accept="image/*"
            hidden
          />
          {(data?.aboutImage && (
            <img
              src={data?.aboutImage?.url || data?.aboutImage}
              alt="About"
              style={{ maxWidth: 200, maxHeight: 200, objectFit: "cover" }}
            />
          )) || <div style={{ color: "#666" }}>No about image</div>}
        </div>

        <div className="box">
          <strong>Change Banner Heading Text</strong>
          <textarea
            name="bannerHeading"
            onChange={handleInput}
            value={data.bannerHeading}
            placeholder="Write Banner Heading Text..."
          />
          <small>
            {countWords(data.bannerHeading)} / {wordLimits.bannerHeading} words
          </small>
        </div>

        <div className="box">
          <strong>Change Banner Text</strong>
          <textarea
            name="bannerText"
            onChange={handleInput}
            value={data.bannerText}
            placeholder="Write Banner Text..."
          />
          <small>
            {countWords(data.bannerText)} / {wordLimits.bannerText} words
          </small>
        </div>

        <div className="box">
          <strong>Change About Description</strong>
          <textarea
            name="aboutDescription"
            onChange={handleInput}
            value={data.aboutDescription}
            placeholder="Write About Description..."
          />
          <small>
            {countWords(data.aboutDescription)} / {wordLimits.aboutDescription}{" "}
            words
          </small>
        </div>

        <button disabled={isSaving} onClick={handleSubmit}>
          {isSaving ? "Saving..." : "Save Now"}
        </button>
      </div>
    </section>
  );
};

export default EditAbout;
