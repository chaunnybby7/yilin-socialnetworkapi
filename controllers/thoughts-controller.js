// require thoughts and users models
const { Thought, Users } = require('../models');

// set up thoughts controller
const thoughtController = {

    // GET all thoughts - api/thoughts
   getAllThoughts(req, res) {
      Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err); 
   });
},
// GET one thought by id - api/thoughts/:id
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({
                message: 'No thought found with this id. ❌'
            });
            return;
        
        }
        res.json(dbThoughtData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},
// POST api/thoughts aka create thought 
addThought({ body }, res) {
    Thought.create(body)
    .then((ThoughtData) => {
        return Users.findOneAndUpdate(
            { _id: body.userId },
            { $addToSet: { thoughts: ThoughtData._id } },
            { new: true }
        );
})
    .then(dbUsersData => {
        if (!dbUsersData) {
            res.status(404).json({ message: 'No user found with this ID.' });
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},
// PUT api/thoughts/:id
// update thought by id 
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({
        _id: params.thoughtId }, 
        { $set: body },
        { runValidators: true, new: true })
        .then(updateThought => {
            if (!updateThought) {
                return res.status(404).json({ message: 'No thought found with this ID. ' });
            }
            return res.json({ message: "Success!" });
        })
        .catch(err => res.json(err));
    },
// DELETE api/thoughts/:id
// delete thought 
removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({
                    message: 'No thought found with this id!'
                });
            }
            return User.findOneAndUpdate({ thoughts: params.thoughtId }, 
                { $pull: { thoughts: params.thoughtId }}, 
                { new: true });
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No thought found with this id!'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
},

// POST api/thoughts/:id/reactions
// CREATE reactions
addReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId },
        { $push: { reactions: body }},
        { new: true, runValidators: true })
        .then(updatedThought => {
            if (!updatedThought) {
                res.status(404).json({ message: 'No reaction found with this id.'});
                return;
            }
            res.json(updatedThought);
        })
        .catch(err => res.json(err));
    },
// DELETE api/thoughts/:id/reactions
// Delete reaction 
removeReaction({
    params
}, res) {
    Thought.findOneAndUpdate({
                _id: params.thoughtId
            },
            //allows to remove the reaction by id
            {
                $pull: {
                    reactions: {
                        reactionId: params.reactionId
                    }
                }
            }, {
                new: true
            }
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({
                    message: 'No reaction found with this id.'
                });
                return;
            }
            res.json(thought)
        })
        .catch(err => res.json(err));
},
}
module.exports = thoughtController;
