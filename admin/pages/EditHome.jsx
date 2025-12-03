import React, { useState, useRef, useEffect } from "react";
import "../styles/pages.style.css";
import useApi from "../store/useApi";

const initialEmpty = {
  heroImage: "", // can be URL string or base64
  heroHeading: "",
  heroSubHeading: "",
  heroDescription: "",
};

const EditHome = () => {
  const { isSaving, saveHeroData, adminSettings, isgettingSettings } = useApi();
  const hero = adminSettings?.hero;

  const [data, setData] = useState(initialEmpty);
  const msgRef = useRef(null);
  const fileRef = useRef(null);

  const wordLimits = {
    heroHeading: 20,
    heroSubHeading: 15,
    heroDescription: 120,
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
    } catch (err) {
      // fail silently if DOM not available
      // console.error(err);
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
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const handleFile = async (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    const file = files[0];

    // Validate size < 1 MB
    const maxSize = 1 * 1024 * 1024; // 1 MB
    if (file.size > maxSize) {
      showMessage("Image must be less than 1 MB.", false);
      // reset the file input
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    try {
      const base64 = await createBase64(file);
      setData((prev) => ({ ...prev, [name]: base64 }));
    } catch (err) {
      showMessage("Failed to read image file.", false);
    }
  };

  const checkValidation = () => {
    for (const key of Object.keys(initialEmpty)) {
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
      // Await the save call. Expecting a truthy success result.
      const result = await saveHeroData(data, showMessage);
      // Interpret success — adapt if your API returns different shape
      const success =
        result === true ||
        (result && typeof result === "object" && result.success === true);

      if (success) {
        showMessage("Saved successfully.", true);
        // reset form only after successful save
        setData(initialEmpty);
        if (fileRef.current) fileRef.current.value = "";
      } else {
        // If saveHeroData already uses showMessage internally on errors,
        // you may skip this line. Keep it as a fallback.
        showMessage("Save failed. Please try again.", false);
      }
    } catch (err) {
      showMessage("An error occurred while saving.", false);
    }
  };

  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // populate form from adminSettings.hero when available
  useEffect(() => {
    if (isgettingSettings || !hero) return;
    // Map your hero shape to the fields we use:
    // adapt these property paths if your backend shape differs
    setData({
      heroImage: hero?.bannerImage?.url || hero?.heroImage || "",
      heroHeading: hero?.bannerHeading || hero?.heroHeading || "",
      heroSubHeading: hero?.bannerText || hero?.heroSubHeading || "",
      heroDescription: hero?.aboutDescription || hero?.heroDescription || "",
    });
  }, [isgettingSettings, hero]);

  return (
    <section className="edit-about">
      <h1>Edit Home Page</h1>
      <span ref={msgRef} id="message"></span>

      <div className="form">
        <div className="flex">
          <label htmlFor="hero-img">Change Hero Image </label>
          <input
            ref={fileRef}
            name="heroImage"
            onChange={handleFile}
            type="file"
            id="hero-img"
            accept="image/*"
            hidden
          />
          <img
            src={data?.heroImage?.url || data?.heroImage || ""}
            alt="Hero"
            style={{ maxWidth: 300, maxHeight: 200, objectFit: "cover" }}
          />
        </div>

        <div className="box">
          <strong>Change Hero Heading(H1)</strong>
          <textarea
            name="heroHeading"
            onChange={handleInput}
            value={data.heroHeading}
            placeholder="Write Hero Heading Text..."
          ></textarea>
          <small>
            {countWords(data.heroHeading)} / {wordLimits.heroHeading} words
          </small>
        </div>

        <div className="box">
          <strong>Change Hero Sub Heading(H2)</strong>
          <textarea
            name="heroSubHeading"
            onChange={handleInput}
            value={data.heroSubHeading}
            placeholder="Write Hero Sub Heading..."
          ></textarea>
          <small>
            {countWords(data.heroSubHeading)} / {wordLimits.heroSubHeading}{" "}
            words
          </small>
        </div>

        <div className="box">
          <strong>Change Hero Description</strong>
          <textarea
            name="heroDescription"
            onChange={handleInput}
            value={data.heroDescription}
            placeholder="Write Hero Description..."
          ></textarea>
          <small>
            {countWords(data.heroDescription)} / {wordLimits.heroDescription}{" "}
            words
          </small>
        </div>

        <button onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Now"}
        </button>
      </div>
    </section>
  );
};

export default EditHome;
