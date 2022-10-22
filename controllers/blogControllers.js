const userDataModel = require('../models/userDataModel');
const blogDataModel = require('../models/blogDataModel');

const createBlog = async (req, res) => {
    const newBlog = new blogDataModel(req.body);
    try {
        const existBlog = await newBlog.save();
        res.status(200).json(existBlog);

    } catch (err) {
        res.status(500).json(err)
    }
}

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog.username === req.body.username) {
            try {
                const updateBlog = await Blog.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updateBlog);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("cannot update");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog.username === req.body.username) {
            try {
                await blog.delete();
                res.status(200).json("Post has been deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("cannot delete");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const fetchBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
    }
}

const fetchAllBlog = async (req, res) => {
    const username = req.query.user;
    const Tag = req.query.tag;

    try {
        let blogs;
        if (username) {
            blogs = await Blog.find({ username }).sort({ createdAt: "desc" });

        } else if (Tag) {
            blogs = await Blog.find({
                tags: {
                    $in: [Tag],
                },
            }).sort({ createdAt: "desc" });
        } else {
            blogs = await Blog.find().sort({ createdAt: "desc" });
        }
        // console.log(blogs)
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { createBlog, updateBlog, deleteBlog, fetchAllBlog, fetchBlogById };