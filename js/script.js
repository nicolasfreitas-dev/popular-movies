import { API } from "../services/api.js";

const cardContainer = document.querySelector(".card-container");

async function getAllPopularMovies() {
    const movies = await API.getPopularMovies()
    movies.forEach(movie => {
        renderMovies(movie)
    })
}

window.onload = function() {
    getAllPopularMovies()
}

function renderMovies(movie) {
    const { title, poster_path, vote_average, release_date, overview } = movie;

    const image = `https://image.tmdb.org/t/p/w500${poster_path}`;

    cardContainer.innerHTML = `
    <div class="img-container">
        <img class="poster-movie" src=${image} alt="foto de capa do filme">
    </div>
    <div class="container-movie">
        <h2 class="movie-title">${title} (${release_date})</h2>
        <div class="movie-icons">
            <div class="icons-container">
                <i class="fa-solid fa-star"></i>
                <span>${vote_average}</span>
            </div>
            <div class="icons-container">
                <i class="fa-regular fa-heart"></i>
                <span>Favoritar</span>
            </div>
        </div>
    </div>
    <div class="container-movie-desc">
        ${overview}
    </div>
`
}