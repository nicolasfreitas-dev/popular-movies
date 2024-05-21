const cardContainer = document.querySelector(".card-container");

const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=47d6dc10e42efa4b24ea80a03fe59ca9&language=pt-br`;

async function apiResult() {
    const fetchResponse = await fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error));
    
    return fetchResponse;
}

async function getPopularMovies(){
    const movies = apiResult();
    movies.forEach((movie) => {
        renderMovies(movie);
    });
}

function renderMovies(movie) {
    const { id, title, poster_path, vote_average, release_date, overview } = movie;

    cardContainer.innerHTML = `
    <div class="img-container">
        <img src=${poster_path} alt="icone do filme">
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
`;
}