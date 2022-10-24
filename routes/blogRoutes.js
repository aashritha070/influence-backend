const router = require('express').Router();
const { createBlog, updateCoverPic, editBlogById, deleteBlogById, fetchTopBlog, fetchAllBlog, fetchBlogById, fetchBlogByAuthor, fetchBlogByTags } = require('../controllers/blogControllers');
const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, cb) {
//         cb(null, '../tmp/coverPic')
//     },
//     filename: function (req, cb) {
//         cb(null, req.file.name + '-' + Date.now())
//     }
// })

const upload = multer({ "dest": "../tmp/coverPic" }).single('file')

router.post('/create', (req, res) => createBlog(req, res)); //create blog

router.post('/edit', (req, res) => editBlogById(req, res)); // update blog

router.post("/delete", (req, res) => deleteBlogById(req, res)); // delete blog

router.post("/id", (req, res) => fetchBlogById(req, res)); // fetch blog by id

router.post("/tag", (req, res) => fetchBlogByTags(req, res)); // fetch blog by tag 

router.post("/author", (req, res) => fetchBlogByAuthor(req, res)); // fetch blog by author

router.post("/", (req, res) => fetchTopBlog(req, res)); // fetch top blog

router.post("/all", (req, res) => fetchAllBlog(req, res)); // fetch all blog

router.post("/upload", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("/upload", err)
        } else if (err) {
            console.log("/upload", err)
        }
        console.log(req)
        return res.status(200).send("Success")
    })
})

module.exports = router;