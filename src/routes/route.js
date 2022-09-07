const express = require('express');
const router = express.Router();
const authorController = require('../controller/authorcontroller');
const blogsController = require('../controller/blogsController');
const loginController = require('../controller/loginController');
const middleware = require('../middleware/middlewares');



router.post('/login', loginController.login)

router.post('/authors', authorController.createAuthor)

router.post('/blogs', middleware.auth01, blogsController.createBlogs)

router.get('/getblogs', middleware.auth01, blogsController.getBlogs)

router.put('/blogs/:blogId', middleware.auth01, middleware.auth02, blogsController.updateBlogs)

router.delete('/deletedBlog/:blogId', middleware.auth01, middleware.auth02, blogsController.deletedBlog)

router.delete('/deletedByQuery', blogsController.deletedByQuery)








module.exports = router;