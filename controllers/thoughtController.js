const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
      .select('-__v');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a thought and add it to associated user's thoughts array
  async createThought(req, res) {

    try {
      // New thought is created
      const thought = await Thought.create(req.body);
      
      // Take the created thought's id and pass it into the method where we updated the users data
        const user = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { runValidators: true, new: true }
        );
          
      // Do a check to see if Thought was created but no user found with that ID
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought was created but no user found with that ID :(', thought });
      }
      // If successful, a success message is posted
      res.json({user, message: 'Thought was added to user'});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      } else {
        await User.deleteMany({ _id: { $in: User.thoughts } });
        res.json({ message: 'Thought deleted!' });
      }
     } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      } else {
      res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new reaction
  async createReaction(req, res) {
    console.log('You are adding a reaction!');
    console.log(req.body);

    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      } else {

      res.json(reaction);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

    // Delete a reaction
    async deleteReaction(req, res) {
      try {
        // Find the thought with the given thoughtId and remove the reaction with the given reactionId
        const dbThoughtData = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reaction: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true}
        );

        // If no thought is found with the given thoughtId, return a 404 response
        if (!dbThoughtData) {
          return res.status(404).json({
            message: 'No thought with this ID',
          });
        }

        // Otherwise, return the updated thought data
        res.json({dbThoughtData});
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    
};
