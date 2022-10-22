const router = require('express').Router();

router.post('/edit', (req, res) => updateBlog(req, res));

router.post('/delete', (req, res) => deleteBlog(req, res));

router.post('/', (req, res) => fetchBlog(req, res));

module.exports = router;