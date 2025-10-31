import React, { useState, useRef, useEffect } from "react";
import "../styles/pages.style.css";
import useApi from "../store/useApi";

const CampaignFlyer = () => {
    const { isCreating, createFlyer } = useApi();
    const [data, setData] = useState({
        flyer: null,
        title: ""
    });
    const msgRef = useRef(null);
    const wordLimits = 50;

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
        if (words?.length <= wordLimits) {
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
        await createFlyer(data, showMessage);
    };

    const countWords = text => {
        if (!text?.trim()) return 0;
        return text?.trim()?.split(/\s+/)?.length;
    };

    return (
        <section className="edit-about">
            <h1>Create New Campaign Flyer</h1>
            <span ref={msgRef} id="message"></span>
            <div className="form">
                <div className="flex">
                    <label htmlFor="flyer">Upload A Flyer (PDF)</label>
                    <input
                        name="flyer"
                        onChange={handleFile}
                        type="file"
                        id="flyer"
                        hidden
                    />
                </div>

                <div className="box">
                    <strong>Write Flyer Title :</strong>
                    <textarea
                        name="title"
                        onChange={handleInput}
                        value={data.title}
                        placeholder="Write Flyer Title..."
                    ></textarea>
                    <small>
                        {countWords(data.title)} / {wordLimits} words
                    </small>
                </div>

                <button onClick={handleSubmit}>
                    {isCreating ? "creating..." : "Create Flyer"}
                </button>
            </div>
        </section>
    );
};

export default CampaignFlyer;
