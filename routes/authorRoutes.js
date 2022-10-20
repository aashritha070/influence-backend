const router = require('express').Router();

router.put('/:id', (req, res) => updateBlog(req, res));

router.delete('/:id', (req, res) => deleteBlog(req, res));

router.get('/:id', (req, res) => fetchBlog(req, res));

module.exports = router;