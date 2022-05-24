const router = require('express').Router();
const thoughtRoutes = require('./thoughts-routes');
const userRoutes = require('./users-routes');

router.use('/thoughts', thoughtRoutes);
// add `users` to routes created in `user-routes.js`
router.use('/users', userRoutes);

module.exports = router;