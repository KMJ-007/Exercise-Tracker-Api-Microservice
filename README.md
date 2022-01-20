# [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)




## This project part of free code camp backend api module, i learned express, what is post method what is get method, how to pass data from front-end to backend.  
### live demo [here](https://Exercise-Tracker-Api-Microservice.karanmj.repl.co)
  
 
 <br>
 <details>
    <summary>User Stories:</summary>

1. You can POST to /api/users with form data username to create a new user. The returned response will be an object with username and _id properties.

2. You can make a GET request to /api/users to get an array of all users. Each element in the array is an object containing a user's username and _id.

3. You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used. The response returned will be the user object with the exercise fields added.

4. You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user. The returned response will be the user object with a log array of all the exercises added. Each log item has the description, duration, and date properties.

5. A request to a user's log (/api/users/:_id/logs) returns an object with a count property representing the number of exercises returned.

6. You can add from, to and limit parameters to a /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
</details>
 <br>

# Technology used to build this project

![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)



## 🛠️ Installation Steps

1. Clone the repository

```bash
git clone https://github.com/KMJ-007/Exercise-Tracker-Api-Microservice.git
```

2. Change the working directory

```bash
cd Exercise-Tracker-Api-Microservice
```

3. Install dependencies

```bash
npm install
```

4. Create `.env` file in root and add your variables

5. Run the app

```bash
npm run dev
```

You are all set! Open [localhost:3000](http://localhost:3000/) to see the app.