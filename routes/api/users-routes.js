const router = require('express').Router();

const { route } = require('.');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addToFriendList, removefromFriendList } = require('../../controllers/users-controller');

// Set up GET all and POST api/users. 
// Name of controller as cb 
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up GET one, PUT, and DELETE at api/users/id
router 
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendId')
    .delete(removefromFriendList)

    module.exports = router;