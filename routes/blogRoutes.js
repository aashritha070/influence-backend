const router = require('express').Router();

router.post('/', (req, res) => createBlog(req, res)); //create blog

router.put('/:id', (req, res) => updateBlog(req, res)); // update blog

router.delete("/:id", (req, res) => deleteBlog(req, res)); // delete blog

router.get("/:id", (req, res) => fetchBlogById(req, res)); // fetch blog by id

router.get("/", (req, res) => fetchAllBlog(req, res)); // fetch all blog

module.exports = router;