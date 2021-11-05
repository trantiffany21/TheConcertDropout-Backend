# TheConcertDropout-Backend

> Direct Link: https://the-concert-dropout-frontend.herokuapp.com/

## Contributors
> Tiffany Tran: https://github.com/trantiffany21
> 
> Cristian Camacho: https://github.com/CristianCamacho
> 
> Abdul Davis: https://github.com/knowid

## Project Description
A web app that stores a user's favorite music artists, sports teams, performers, etc. and shows upcoming events they can attend along with various information about the event. The events, performers, and information were pulled from the Seat Geek API (http://platform.seatgeek.com/).

### Technology Used and Approaches
- The website was built using a React, Mongoose, Express, Node.js, Javascript, HTML, and CSS
- React was used to build the frontend and fetch from APIs and the Mongoose and Express backend. 
- The backend contains a user model storing a user's login information and performers list. Bcrypt was used to maintain security for user passwords.
- The Bootstrap framework was used for styling of the pages
- The app is being hosted on MongoDB Atlas and deployed on Heroku
- Third Party APIs used were Seat Geek and Kanye Rest to fetch performer/event information and Homepage quotes respectively. 


### Upcoming features
- Send emails to a user about upcoming events once a month so they do not need to login.
- Enhanced filter capabilities for events and performers
- Google maps integration to view venue locations
