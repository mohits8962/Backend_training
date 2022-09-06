const express = require('express');
const router = express.Router();
const authorController = require('../controller/authorcontroller');
const blogsController = require('../controller/blogsController');

router.post('/authors', authorController.createAuthor)

router.post('/blogs', blogsController.createBlogs)

router.get('/getblogs', blogsController.getBlogs)

router.put('/blogs/:blogId', blogsController.updateBlogs)

router.delete('/deletedBlog/:blogId', blogsController.deletedBlog)

router.delete('/deletedByQuery', blogsController.deletedByQuery)








module.exports = router;