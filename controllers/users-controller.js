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
