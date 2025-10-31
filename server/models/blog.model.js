const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        blogTitle: {
            type: String,
            required: true,
        },
        blogImage: {
            type: Object,
            required: true,
        },
        blogContent : {
          type : String ,
          required:true
        },
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
