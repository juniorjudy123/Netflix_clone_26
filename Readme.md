# Netflix_gpt

installed vite
tailwind css
-installed React router
-Header
-Routing
-Login form/Sign up form
-Use formik library for big forms
-form validations and useRef hook
-useRef hook
-Firebase set Up
-Deploying our app to production
-create signupand sign in firebase
-redux store with userSlice
-Bugfix-username and profile picture update
-bugfix-if the user is not logged in Redirect /browse to login page

need to download logos and images
-unsubscribe to the eventlistener
-exported LOGO and USER_AVATAR from constants file(why use caps)-hard coded values
-faced the missing await while fetch call which resulted in giving the promise itself
-why API was called two times - console.log gives data two times - because of React strict mode. why do we need strict mode? why ?
-IMplicit return bug with the moviesSlice
-Added hardcoded values to the constants file
-Register TMDB API and create an app and get access token

- Get data from TMDB now playing movies list API
- learned early return in hero component
- overview in videotitle misaligned - used leading-relaxed text-justify in tailwind css

- GPT search feature 

# Features

# Browse page after authentication

- Header
- Main Container
  -Triler in background
  -Title and description
  -Movie suggestions

- Secondary Container

# Authentication

- Login
- Signup
  -redirect to browse page

# NetflixGpt

-search bar
-Movie suggestions

# structure

1. Loginpage
   -Header
   -Login/sign up form
   -has background image (have to decide whether it should be made another component)

   # Learnings

   useRef Hook
   Regex validation

   # hosting url

   https://netflix-ai-64fe7.web.app

# Engineering decisions

decided not to create a movie model just to duplicate TMDB data. tmdb already owns that information 


 database 

user_id    tmdb_movie_id    added_at
1          550              ...
1          603              ...
2          27205            ...

Then when the user opens their watchlist:

React
   ↓
GET /api/watchlist/
   ↓
Django
   ↓
Database → movie IDs
   ↓
TMDB → movie details
   ↓
Django
   ↓
React