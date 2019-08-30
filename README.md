# **EDTV - Program Survey Project - Backend**

#### _A survey creation application built with React and Express using MongoDB and Mongoose_

### Setup Instructions:
1. [Fork and clone](https://git.generalassemb.ly/ga-wdi-boston/meta/wiki/ForkAndClone) this repository
2. Install dependencies using `npm install`
3. Verify MongoDB is running with `brew services list` (Run `brew services restart mongodb` if not)
4. Use `npm run server` to connect to the server

### Deployed URLs and Repo Links:

##### Backend Repo:
https://github.com/swsprague/edtv-survey-express-backend

##### Backend:
https://edtv-survey-express-backend.herokuapp.com

##### Frontend:
https://swsprague.github.io/edtv-survey-react-frontend

##### Frontend Repo:
https://github.com/swsprague/edtv-survey-react-frontend

### Project Synopsis:
I wanted to create a survey system that allows users to submit responses to questions regarding programming choices and preferences as part the Plymouth Public Schools Educational Television Program. This project will be the first step in my approach to adding more functionality and dynamics to the EDTV website as part of my new role with EDTV, which I will be starting following the completion of this program!

### Planning:
I initially planned for this project to be a choose-your-own-adventure game, but after consulting with my brother I decided to use the idea in a more useful way (at least to me), where I'd be able to implement the application as part of my previously mentioned new role at EDTV. After plotting out my resources via an ERD and determining UI with wireframes, I set course for MVP and have been pushing toward it ever since.

### User Stories

##### Authentication:

- As a user, I want to be able to sign up for an account.
- As a user, I want to be able to sign into my account.
- As a user, I want to be able to change the password for my account.
- As a user, I want to be able to sign out of my account.

##### Survey Functionality:

- As a user, I want to be able to start a survey.
- As a user, I want to be able to select an answer to a question on a survey.
- As a user, I want to be able to change my answer to a survey.
- As a user, I want to be able to delete my responses to a survey.
- As a user, I want to be able to submit a survey response for review.

##### Stretch Goal Stories:

- As a user, I want to be able to add my own custom answers to a survey question.
- As a user, I want to be able to pause a survey and save my responses.
- As a user, I want to be able to return to and resume a saved survey.

### Technologies Used:
- React
- JSX
- Bootstrap
- React Router-DOM
- React-Bootstrap
- Express
- MongoDB
- Mongoose
- CSS

### Catalog of Routes:

##### Survey:

|   CRUD Action | URI Pattern   |
| ------------- |:-------------:|
| GET      | /surveys |
| GET      | /surveys/:id     |
| POST      | /surveys    |
| PATCH     | /surveys/:id  |
| DELETE  | /surveys/:id   |

##### Question:

|   CRUD Action | URI Pattern   |
| ------------- |:-------------:|
| GET      | /questions |
| GET      | /questions/:id     |
| POST      | /questions    |
| PATCH     | /questions/:id  |
| DELETE  | /questions/:id   |

##### User Responses:

|   CRUD Action | URI Pattern   |
| ------------- |:-------------:|
| GET      | /responses |
| GET      | /responses/:id     |
| POST      | /responses    |
| PATCH     | /responses/:id  |
| DELETE  | /responses/:id   |

### Unsolved Problems:
- No branching Questions based on UserResponses
- Only a limited number of 'Answer' options can be added to a question
- Questions do not currently store their corresponding UserResponses
- UserResponses do not currently store their corresponding question ID
- Still need to implement proper logos and information related to EDTV Program to incorporate application into existing website
- Would like to eventually display survey results / percentages to users

### App Screenshots
##### Homepage:
![App Screenshots Pt. 1][Homepage]

[Homepage]: https://i.imgur.com/eMt3Lyf.png

##### Sign-In:
![App Screenshots Pt. 2][Sign-In]

[Sign-In]: https://i.imgur.com/bICz0bf.png

##### Question / Response Form:
![App Screenshots Pt. 3][Question-Response Form]

[Question-Response Form]: https://i.imgur.com/bYrb3vo.png

### Wireframe
![Wireframe Pg. 1][Wireframe Pt. 1]

[Wireframe Pt. 1]: https://i.imgur.com/of3YCLZ.png

![Wireframe Pg. 2][Wireframe Pt. 2]

[Wireframe Pt. 2]: https://i.imgur.com/XdIb37i.png

![Wireframe Pg. 3][Wireframe Pt. 3]

[Wireframe Pt. 3]: https://i.imgur.com/tmF78HH.png

### ERD

![ERD Pg. 1][ERD]

[ERD]: https://i.imgur.com/ZQ40KQ6.jpg
