import React, { useState, useRef, useEffect } from "react";
import "../styles/pages.style.css";
import useApi from "../store/useApi";

const EditAbout = () => {
    const { isSaving, saveAboutData, adminSettings, isgettingSettings } =
        useApi();
    const settings = adminSettings?.aboutPage;
    const [data, setData] = useState({
        bannerImage: settings?.bannerImage?.url,
        aboutImage: settings?.aboutImage?.url,
        bannerText: settings?.bannerText,
        bannerHeading: settings?.bannerHeading,
        aboutDescription: settings?.aboutDescription
    });
    const msgRef = useRef(null);

    const wordLimits = {
        bannerText: 15,
        bannerHeading: 8,
        aboutDescription: 100
    };

    const showMessage = (message, type) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        if (type) {
            msgRef.current.classList.add("success");
            msgRef.current.textContent = message;
        } else {
            msgRef.current.classList.add("error");
            msgRef.current.textContent = message;
        }
        setTimeout(() => {
            msgRef.current.removeAttribute("class");
            msgRef.current.textContent = "";
        }, 2500);
    };

    const handleInput = e => {
        const { name, value } = e.target;
        const words = value?.trim()?.split(/\s+/);
        if (words?.length <= wordLimits[name]) {
            setData({
                ...data,
                [name]: value
            });
        }
    };

    const createBase64 = async file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleFile = async e => {
        const { name, files } = e.target;
        if (files[0]) {
            setData({
                ...data,
                [name]: await createBase64(files[0])
            });
        }
    };

    const checkValidation = () => {
        for (const key in data) {
            if (data[key] === null || data[key] === "") {
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
        await saveAboutData(data, showMessage);
    };

    const countWords = text => {
        if (!text?.trim()) return 0;
        return text?.trim()?.split(/\s+/)?.length;
    };
    useEffect(() => {
        if (isgettingSettings || !settings) return;
        setData(settings);
    }, [isgettingSettings, settings]);

    return (
        <section className="edit-about">
            <h1>Edit About Page</h1>
            <span ref={msgRef} id="message"></span>
            <div className="form">
                <div className="flex">
                    <label htmlFor="banner-img">Change Banner BG Image </label>
                    <input
                        name="bannerImage"
                        onChange={handleFile}
                        type="file"
                        id="banner-img"
                        hidden
                    />
                    {data?.bannerImage?.url || data?.bannerImage &&
                    <img src={data?.bannerImage?.url || data?.bannerImage} alt="Banner" />
}
                </div>

                <div className="flex">
                    <label htmlFor="about-img">Change About Image </label>
                    <input
                        name="aboutImage"
                        onChange={handleFile}
                        type="file"
                        id="about-img"
                        hidden
                    />
                    {data?.aboutImage?.url || data?.aboutImage &&
                    <img src={data?.aboutImage?.url || data?.aboutImage} alt="About" />
}
                </div>
                <div className="box">
                    <strong>Change Banner Heading Text</strong>
                    <textarea
                        name="bannerHeading"
                        onChange={handleInput}
                        value={data.bannerHeading}
                        placeholder="Write Banner Heading Text..."
                    ></textarea>
                    <small>
                        {countWords(data.bannerHeading)} /{" "}
                        {wordLimits.bannerHeading} words
                    </small>
                </div>

                <div className="box">
                    <strong>Change Banner Text</strong>
                    <textarea
                        name="bannerText"
                        onChange={handleInput}
                        value={data.bannerText}
                        placeholder="Write Banner Text..."
                    ></textarea>
                    <small>
                        {countWords(data.bannerText)} / {wordLimits.bannerText}{" "}
                        words
                    </small>
                </div>

                <div className="box">
                    <strong>Change About Description</strong>
                    <textarea
                        name="aboutDescription"
                        onChange={handleInput}
                        value={data.aboutDescription}
                        placeholder="Write About Description..."
                    ></textarea>
                    <small>
                        {countWords(data.aboutDescription)} /{" "}
                        {wordLimits.aboutDescription} words
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
