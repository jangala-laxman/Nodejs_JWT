# Nodejs_JWT

JWT Authentication using Nodejs and MongoDB. Creating a sample user and creating articles (one article having only one author) using Postman. 

A user can have multiple articles and an article is assigned with only one user.

A user will have name, age, unique emailId, password. On successfull signup of user, user needs to login for sending the requests. Once the user loggedin, JWT token will be generated and this token will be valid for 10min (just as an example, can be modified) and all the requests will be worked by verifying the token in passing from the middleware function for all the requests. Here the token is not saved in the server or browser. It was sent using headers for every request.

Here is the hosted URL for this JWT Authentication API.

https://nodejs-jwt-39oh.onrender.com

