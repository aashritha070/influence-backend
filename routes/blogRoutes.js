const router = require('express').Router();
const { createBlog, editBlogById, deleteBlogById, fetchTopBlog, fetchAllBlog, fetchBlogById, fetchBlogByAuthor } = require('../controllers/blogControllers');

router.post('/', (req, res) => createBlog(req, res)); //create blog

router.put('/', (req, res) => editBlogById(req, res)); // update blog

router.delete("/", (req, res) => deleteBlogById(req, res)); // delete blog

router.get("/id", (req, res) => fetchBlogById(req, res)); // fetch blog by id

router.get("/", (req, res) => fetchTopBlog(req, res)); // fetch top blog

router.get("/all", (req, res) => fetchAllBlog(req, res)); // fetch all blog

module.exports = router;