# jbbrnt

## Description

jbbrnt is a social media application that allows users to write thoughts and react to friends' thoughts. Users can manage their friendlist by adding or removing other users. They can edit details about themselves, or the posts they create. This application was created using MongoDB and NoSQL and I used Insomnia to run the routes. I wanted to test my new skillset in these technologies, and create an application that was solely backend. I learned that it can be challenging to construct an application without a GUI, but this helped expose me to a different component of web development.

## Table of Contents

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

My application can be forked from my repository here:
<https://github.com/ericlyn4s/jbbrnt/tree/main>

Once open on your local machine, run `mongod` within the terminal. Open another terminal, and within the same folder structure run `npm run`. This will now be running on localhost:3001, and you'll need to forward that port in order to access in Insomnia. Finally, open Insomnia and run the routes as described below. The database has been created and you're ready to start querying the data.

## Usage

A walkthrough of this application can be viewed here:
https://www.youtube.com/watch?v=stauBkN6wIc

Within Insomnia, you can run several API routes to query the user and thought documents. Each route is described below:

`/api/users`

- `GET` all users
- `GET` a single user by its `_id` and populated thought and friend data (*example route:* `/api/users/65f74b3dfe2a21c158946a40`)
- `POST` a new user (*example JSON input:* `{ "username": "lernantino", "email": "lernantino@gmail.com" }`)
- `PUT` to update a user by its _id (example route: `/api/users/65f74b3dfe2a21c158946a40` *example JSON input:* `{ "username": "lernantino", "email": "boblernatino@gmail.com" }`)
- `DELETE` to remove user by its _id (*example route:* `/api/users/65f74b3dfe2a21c158946a40`)

`/api/users/:userId/friends/:friendId`

- `POST` to add a new friend to a user's friend list (*example route:* `/api/users/65f74b3dfe2a21c158946a40/friends/65f9fb255b27d1bda0f985ca`)
- `DELETE` to remove a friend from a user's friend list ((*example route:* `/api/users/65f74b3dfe2a21c158946a40/friends/65f9fb255b27d1bda0f985ca`)

`/api/thoughts`

- `GET` to get all thoughts (*example route:* `/api/thoughts`)
- `GET` to get a single thought by its _id (*example route:* `/api/thoughts/65fa0388cfa8b97e4e2a0e73`)
- `POST` to create a new thought (*example route:* `/api/thoughts` *example JSON input:* `{ "thoughtText": "Here's a cool thought...","username": "lernantino", "userId": "5edff358a0fcb779aa7b118b"}` )
- `PUT` to update a thought by its _id  (*example route:* `/api/thoughts/65fa0360cfa8b97e4e2a0e6f` *example JSON input:* `{ "thoughtText": "Here's a better thought","username": "lernantino", "userId": "5edff358a0fcb779aa7b118b"}` )
- `DELETE` to remove a thought by its _id (*example route:* `/api/thoughts/65fa0360cfa8b97e4e2a0e6f`)

`/api/thoughts/:thoughtId/reactions`

- `POST` to create a reaction stored in a single thought's reactions array field (*example route:* `/api/thoughts/65f9fd762aafb5526ccdf214/reactions` *example JSON input:* `{ "reactionText": "That thought is super cool!","username": "lernantino"}` )
- `DELETE` to pull and remove a reaction by the reaction's reactionId value (*example route:* `/api/thoughts/65f9fd762aafb5526ccdf214/reactions/65fa029b459ff6127703c397`) 


<image src="assets/example-get-thoughts.png" width="650" alt="Image of a get all thoughts route"/> \
*Example of a get all thoughts route*

<image src="assets/example-delete-reaction.png" width="650" alt="Image of a delete reaction route"/> \
*Example of a delete reaction route*

## Credits

I had tutor sessions with Charles Puentes-Matos on 3/13/2024 and 3/19/2024.

## License

MIT License

Copyright (c) 2024 Eric Peterson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
