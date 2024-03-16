const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }


  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random reaction objects using a helper function that we imported from ./data
    const thoughts = getRandomThoughts(5);

    const username = getRandomName();
    const email = `${username}@gmail.com`;

    users.push({
      username,
      email,
      thoughts,
      friends: [...userData.map(({_id}) => _id)],
    });
  }

  // Add users to the collection and await the results
  const userData = await User.insertMany(users);

  // Add courses to the collection and await the results
  // Course.insertOne({
  const thoughts = await Thought.insertMany({
    thoughtText: 'Thinking...',
    createdAt: Date.now(),
    username: [...userData.map(({_id}) => _id)],
    reaction: "Haha",
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
