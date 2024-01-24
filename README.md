
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

Documentation for sample Data using [Postman](https://documenter.getpostman.com/view/23029976/2s9Yynn4Yj)


## Demo
### Only one user available right now.
![image](https://github.com/niteshtiwari52/LLG/assets/82033937/b03c2879-b72f-4b99-8196-a64f8d5327d2)
![image](https://github.com/niteshtiwari52/LLG/assets/82033937/2d3538b6-2279-4a8c-a91f-a8b45bf20c7f)
![image](https://github.com/niteshtiwari52/LLG/assets/82033937/1c0e6ae7-e3ee-474d-9ed8-b603db1c06a6)
![image](https://github.com/niteshtiwari52/LLG/assets/82033937/ae91aa25-e6c0-4ad7-a8d1-4708247e6aa2)
![image](https://github.com/niteshtiwari52/LLG/assets/82033937/454efa41-ad07-4af7-88a2-c2efef4687e3)
![image](https://github.com/niteshtiwari52/LLG/assets/82033937/94c5e615-9a44-4c4b-99c3-02271287fa19)
![image](https://github.com/niteshtiwari52/LLG/assets/82033937/c44495cf-f363-4a34-aba3-4b7d907def50)




## Authors

- [@niteshtiwari52](https://www.github.com/niteshtiwari52)


## Future Implementation may be 
- Chat Application Integration
- Time based quiz 
- Quiz host by teachers/organisation give access to attendee
- Courses Creation 
