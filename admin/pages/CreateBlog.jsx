import React, { useState, useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom"
import useApi from "../store/useApi"

const CreateBlog = () => {
    const navigate = useNavigate()
    const {isSaving,createBlog} = useApi()
    const msgRef = useRef(null);
    const [data, setData] = useState({
        blogTitle: "",
        blogImage: null,
        blogContent: ""
    });

    const wordLimits = 5000;

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
        await createBlog(data,showMessage)
    };

    const countWords = text => {
        if (!text?.trim()) return 0;
        return text?.trim()?.split(/\s+/)?.length;
    };

    return (
        <section className="edit-about">
            <h1>Create New Blog</h1>
            <div className="blog-form">
                <span ref={msgRef} id="message"></span>
                {data.blogImage && <img src={data.blogImage} />}
                <label htmlFor="blog-img">Select Blog Image</label>
                <input
                    onChange={handleFile}
                    name="blogImage"
                    type="file"
                    id="blog-img"
                    hidden
                />
                <strong>Enter blog title </strong>
                <input
                    name="blogTitle"
                    onChange={handleInput}
                    value={data.blogTitle}
                    type="text"
                    placeholder="Write Blog Title..."
                />
                <textarea
                    name="blogContent"
                    onChange={handleInput}
                    value={data.blogContent}
                    className="blog-text"
                    placeholder="Start creating a new blog...."
                ></textarea>
                <small>
                    {countWords(data.blogContent)} / {wordLimits} words
                </small>
                <button onClick={handleSubmit}>{isSaving ?"Processing..." : "Publish Blog"}</button>
            </div>
        </section>
    );
};

export default CreateBlog;
