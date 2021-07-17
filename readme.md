# Movie List App

## Introduction

#### Movie List App is a simple javascript project which fetch and display the movie list to the user.

- This app uses the open-source movie API from TMDB to create a movie listing.
- Lazy loading technique is used to load the movies and once loaded the movies are displayed in grid format category wise.
- Search capability is added to search for a particular film in the list irrespective of the category.
- Pagination concept is used to display the movie. This is done in server side to avoid the delay in fetching all 1000 or more movies in -single take.Instead we load 20  data for every page and this avoids the delay in fetching data from backend.


## Requirements:

For using the TMDB API, create an account. You will be provided with a API_KEY. Send that api_key as a parameter to fetch the response data.

## API Details: 

> TMDB provides a variety of API for various category. 
- popularmovie_api_url =  https://api.themoviedb.org/3/movie/popular?api_key={your_api_key};
- topratedmovie_api_url =  https://api.themoviedb.org/3/movie/top_rated?api_key={your_api_key};
- upcomingmovie_api_url =  https://api.themoviedb.org/3/movie/upcoming?api_key={your_api_key};
- nowplaying_api_url =  https://api.themoviedb.org/3/movie/now_playing?api_key={your_api_key};

For further details, [visit](https://developers.themoviedb.org/3/getting-started/)  TMDB official documentation.

## Design Consideration:

- TMDB DB and API
- Frontend: html, css, js

## Further Imporovements:

In future, we can create our own db and create our own api to reduce the dependency on external API. We can extend this to a BookMyTickets project which will enable the user to book the movie tickets of nowplaying movies.  
For other movies we can add up the movie store location/ OTT platform link where the user can enjoy the movie.


## Usage
Run public/index.html on any server