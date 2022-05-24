const { User } = require('../models');

const userCtrl = {
    // GET api/users - get all users data
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

// GET user by ID, GET api/users/:id
getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate([ { path: 'thoughts', select: "-__v"}, { path: 'friends', select: "-__v" } ])
    .select('-__v')
    .then(dbUserData => {
        if (!dbUserData => {
            res.status(404).json({ message: 'No User found with this ID. '});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},

//POST /api/users
// Create user 
updateUser({
    params,
    body
}, res) {
    User.findOneAndUpdate({
            _id: params.id
        }, body, {
            new: true,
            runValidators: true
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id.'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
},

// DELETE User
deleteUser({
    params
}, res) {
    User.findOneAndDelete({
            _id: params.id
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id.'
                });
                return;
            }
            return dbUserData;
        })
        .then(dbUserData => {
            User.updateMany({
                    _id: {
                        $in: dbUserData.friends
                    }
                }, {
                    $pull: {
                        friends: params.userId
                    }
                })
                .then(() => {
                    //deletes user's thought associated with id
                    Thought.deleteMany({
                            username: dbUserData.username
                        })
                        .then(() => {
                            res.json({
                                message: 'User deleted successfully'
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(400).json(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
},

// ADD friends
addToFriendList({
    params
}, res) {
    User.findOneAndUpdate({
            _id: params.userId
        }, {
            $push: {
                friends: params.friendId
            }
        }, {
            new: true
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id!'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        });
},
