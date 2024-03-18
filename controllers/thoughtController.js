const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('users');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .populate('users');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a thought and add it to associated user's thoughts array
  async createThought(req, res) {

    try {
      // New thought is created
      const thought = await Thought.create(req.body);
      res.json(thought);
      
      // Take the created thought’s id and pass it into the method where we updating the users data
      {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: thought.id } },
          { runValidators: true, new: true }
        );
          
      // Do a check to see if Thought was created but no user found with that ID
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought was created but no user found with that ID :(' });
      }
      // If successful, a success message is posted
      res.json(user);
    }
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
      }

      await User.deleteMany({ _id: { $in: thought.username } });
      res.json({ message: 'Thought deleted!' });
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
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
