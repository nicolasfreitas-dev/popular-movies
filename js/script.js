import { API } from "../services/api.js";

const container = document.querySelector(".movies");

async function getAllPopularMovies() {
    const movies = await API.getPopularMovies()
    movies.forEach(movie => renderMovies(movie))
}

window.onload = function() {
    getAllPopularMovies()
}

function renderMovies(movie) {
    const { title, poster_path, vote_average, release_date, overview } = movie;

    const year = new Date(release_date).getFullYear();
    const image = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const movieCard = document.createElement("div");
    movieCard.classList.add("card-container");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("img-container");
    
    const cardImage = document.createElement("img");
    cardImage.src = image;
    cardImage.alt = "movie image";
    cardImage.classList.add("poster-movie");

    const movieContainer = document.createElement("div");
    movieContainer.classList.add("container-movie");

    const movieTitle = document.createElement("h2");
    movieTitle.textContent = `${title} (${year})`;
    movieTitle.classList.add("movie-title");

    const movieIcons = document.createElement("div");
    movieIcons.classList.add("movie-icons");

    const rateIconContainer = document.createElement("div");
    rateIconContainer.classList.add("icons-container");

    const starIcon = document.createElement("i");
    starIcon.classList.add("fa-solid");
    starIcon.classList.add("fa-star");
    const rating = document.createElement("span");
    rating.textContent = vote_average;

    const favIconContainer = document.createElement("div");
    favIconContainer.classList.add("icons-container");

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-regular");
    heartIcon.classList.add("fa-heart");
    const favorite = document.createElement("span");
    favorite.textContent = "Favoritar";

    const movieDescriptionContainer = document.createElement("div");
    movieDescriptionContainer.classList.add("container-movie-desc");
    movieDescriptionContainer.textContent = overview;

    imageContainer.appendChild(cardImage);
    
    movieContainer.appendChild(movieTitle);
    movieContainer.appendChild(movieIcons);

    movieIcons.appendChild(rateIconContainer);
    rateIconContainer.appendChild(starIcon);
    rateIconContainer.appendChild(rating);
    
    movieIcons.appendChild(favIconContainer);
    favIconContainer.appendChild(heartIcon);
    favIconContainer.appendChild(favorite);

    movieCard.appendChild(imageContainer);
    movieCard.appendChild(movieContainer);
    movieCard.appendChild(movieDescriptionContainer);

    container.appendChild(movieCard);
}