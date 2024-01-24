
# LLG - Language Learning Game

A Language Learning Game is platform wher user can learn Languages and practice language by playing quizzes.


## Features

- User Authentication
- Play Quiz
- Leaderboard
- Access All previous pending/completed quizzes



## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express, Babel

**Database:** MongoDB

**Deployment:** Vercel(client) , Render(Server)


## Run Locally

- Clone the project

```bash
  git clone https://github.com/niteshtiwari52/LLG.git
```

- Go to the project directory

```bash
  cd LLG
```
#### Install dependencies for Client
- Go to the client directory

```bash
  cd client
  npm install
```


#### Install dependencies for Server
- Go to the server directory

```bash
  cd server
  npm install
```

#### Add Environment Variables for running client server

`REACT_APP_API_URL=http://localhost:4000` 

#### Add Environment Variables for running backend server

`PORT = 4000`

`MONGO_URI: YOUR_MONGODB_URL`

`JWT_SECRET: YOUR_RANDOM_VALUE_FOR_JWT_SECRET`

`CLIENT_URL = http://localhost:3000`

#### run client and server

- Start the client server

```bash
  cd server
  npm start
```
- Start the client server

```bash
  cd server
  npm run dev
```


## Documentation

Documentation for  [sample Data](https://documenter.getpostman.com/view/23029976/2s9Yynn4Yj)


## Demo

Insert gif or link to demo


## Authors

- [@niteshtiwari52](https://www.github.com/niteshtiwari52)


## Future Implementation may be 
- Chat Application Integration
- Time based quiz 
- Quiz host by teachers/organisation give access to attendee
- Courses Creation 
