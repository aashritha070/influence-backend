const router = require('express').Router();
const { createBlog, editBlogById, deleteBlogById, fetchTopBlog, fetchAllBlog, fetchBlogById, fetchBlogByAuthor, fetchBlogByTags } = require('../controllers/blogControllers');

router.post('/create', (req, res) => createBlog(req, res)); //create blog

router.post('/edit', (req, res) => editBlogById(req, res)); // update blog

router.post("/delete", (req, res) => deleteBlogById(req, res)); // delete blog

router.post("/id", (req, res) => fetchBlogById(req, res)); // fetch blog by id

router.post("/tag", (req, res) => fetchBlogByTags(req, res)); // fetch all blog

router.post("/author", (req, res) => fetchBlogByAuthor(req, res)); // fetch all blog

router.post("/", (req, res) => fetchTopBlog(req, res)); // fetch top blog

router.post("/all", (req, res) => fetchAllBlog(req, res)); // fetch all blog


module.exports = router;