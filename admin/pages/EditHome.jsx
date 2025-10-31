import React, { useState, useRef, useEffect } from "react";
import "../styles/pages.style.css";
import useApi from "../store/useApi";

const EditHome = () => {
    const { isSaving, saveHeroData, adminSettings, isgettingSettings } =
        useApi();
    const hero = adminSettings?.hero;
    const [data, setData] = useState({
        heroImage: hero?.bannerImage?.url,
        heroHeading: hero?.aboutImage?.url,
        heroSubHeading: hero?.bannerText,
        heroDescription: hero?.bannerHeading
    });
    const msgRef = useRef(null);

    const wordLimits = {
        heroHeading: 20,
        heroSubHeading: 15,
        heroDescription: 120
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
            if (
                data[key] === null ||
                data[key] === "" ||
                data[key] === undefined
            ) {
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
        await saveHeroData(data, showMessage);
    };

    const countWords = text => {
        if (!text?.trim()) return 0;
        return text?.trim()?.split(/\s+/)?.length;
    };
    useEffect(() => {
        if (isgettingSettings || !hero) return;
        setData(hero);
    }, [isgettingSettings, hero]);

    return (
        <section className="edit-about">
            <h1>Edit Home Page</h1>
            <span ref={msgRef} id="message"></span>
            <div className="form">
                <div className="flex">
                    <label htmlFor="hero-img">Change Hero Image </label>
                    <input
                        name="heroImage"
                        onChange={handleFile}
                        type="file"
                        id="hero-img"
                        hidden
                    />
                    <img
                        src={data?.heroImage?.url || data?.heroImage}
                        alt="Hero"
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
                        {countWords(data.bannerHeading)} /{" "}
                        {wordLimits.bannerHeading} words
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
                        {countWords(data.bannerText)} / {wordLimits.bannerText}{" "}
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
                        {countWords(data.aboutDescription)} /{" "}
                        {wordLimits.aboutDescription} words
                    </small>
                </div>

                <button onClick={handleSubmit}>
                    {isSaving ? "Saving..." : "Save Now"}
                </button>
            </div>
        </section>
    );
};

export default EditHome;
