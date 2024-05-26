import { API } from "../services/api.js";
import { LocalStorage } from "../services/localstorage.js";

const container = document.querySelector(".movies");
const inputSearch = document.querySelector("#header-search");
const checkboxInput = document.querySelector("input[type='checkbox']");

checkboxInput.addEventListener("change", verifyCheckboxStatus);

function verifyCheckboxStatus() {
    const isChecked = checkboxInput.checked;

    cleanAllMovies();

    if (isChecked) {
        const movies = LocalStorage.getFavoriteMovies() || [];
        movies.forEach(movie => renderMovies(movie));
    } else {
        getAllPopularMovies();
    }
}

async function searchMovies() {
    const inputValue = inputSearch.value;
    
    cleanAllMovies();

    if (inputValue != "") {
        const movies = await API.searchMovieByName(inputValue)
        movies.forEach(movie => renderMovies(movie))
    } else {
        getAllPopularMovies();
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchMovies();
    }
});

function cleanAllMovies() {
    container.innerHTML = "";
}

function movieFavorited(event, movie) {
   const favoriteState = {
    favorited: "assets/heart-fill.svg",
    notFavorited: "assets/heart.svg"
   };

   if (event.target.src.includes(favoriteState.notFavorited)) {
        event.target.src = favoriteState.favorited
        LocalStorage.saveToLocalStorage(movie)
   } else {
        event.target.src = favoriteState.notFavorited
        LocalStorage.removeFromLocalStorage(movie.id)
   }
}

async function getAllPopularMovies() {
    const movies = await API.getPopularMovies()
    movies.forEach(movie => renderMovies(movie))
}

window.onload = function() {
    getAllPopularMovies()
}

function renderMovies(movie) {
    const { id, title, poster_path, vote_average, release_date, overview } = movie;

    const isFavorited = LocalStorage.checkMovieIsFavorited(id);
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
    rating.textContent = vote_average.toFixed(1);

    const favIconContainer = document.createElement("div");
    favIconContainer.classList.add("icons-container");

    const heartIcon = document.createElement("img");
    heartIcon.src = isFavorited ? "assets/heart.svg" : "assets/heart-fill.svg";
    heartIcon.alt = "heart";
    heartIcon.classList.add("favorite-image");

    heartIcon.addEventListener("click", (event) => movieFavorited(event, movie));
    
    const favoriteText = document.createElement("span");
    favoriteText.textContent = "Favoritar";

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
    favIconContainer.appendChild(favoriteText);

    movieCard.appendChild(imageContainer);
    movieCard.appendChild(movieContainer);
    movieCard.appendChild(movieDescriptionContainer);

    container.appendChild(movieCard);
}