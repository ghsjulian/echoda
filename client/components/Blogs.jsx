import React,{useEffect }from "react";
import BlogCard from "./BlogCard";
import useApp from "../store/useApp"

const Blogs = () => {
    const {blogs,getBlogs,isBlogging} = useApp()
    useEffect(()=>{
        getBlogs()
        if(isBlogging) return 
    },[getBlogs])
    return (
        <section id="manifestos" className="content-section">
            <h3>Our Popular Blogs</h3>
            <div className="manifesto-grid">
                {blogs &&
                    blogs?.length > 0 &&
                    blogs?.map((item, index) => {
                        return <BlogCard key={index} blog={item} />;
                    })}
            </div>
        </section>
    );
};

export default Blogs;
