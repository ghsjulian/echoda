import React, { useState, useRef, useEffect } from "react";
import "../styles/pages.style.css";
import useApi from "../store/useApi";

const AddTeam = () => {
    const { isCreating, createTeam } = useApi();
    const [data, setData] = useState({
        memberImage: null,
        memberName: "",
        memberAbout: ""
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
        await createTeam(data, showMessage);
    };

    const countWords = text => {
        if (!text?.trim()) return 0;
        return text?.trim()?.split(/\s+/)?.length;
    };

    return (
        <section className="edit-about">
            <h1>Create New Team</h1>
            <span ref={msgRef} id="message"></span>
            <div className="form">
                <div className="flex">
                    <label htmlFor="team-img">Upload Members Image </label>
                    <input
                        name="memberImage"
                        onChange={handleFile}
                        type="file"
                        id="team-img"
                        hidden
                    />
                    {data?.memberImage && (
                        <img src={data?.memberImage} alt="Member" />
                    )}
                </div>

                <div className="box">
                    <strong>Enter Members Full Name :</strong>
                    <input
                        type="text"
                        name="memberName"
                        onChange={handleInput}
                        value={data.memberName}
                        placeholder="Enter Member Full Name"
                    />
                </div>

                <div className="box">
                    <strong>Write Members About Description :</strong>
                    <textarea
                        name="memberAbout"
                        onChange={handleInput}
                        value={data.memberAbout}
                        placeholder="Write About Member..."
                    ></textarea>
                    <small>
                        {countWords(data.memberAbout)} / {wordLimits} words
                    </small>
                </div>

                <button onClick={handleSubmit}>
                    {isCreating ? "creating..." : "Create Now"}
                </button>
            </div>
        </section>
    );
};

export default AddTeam;
