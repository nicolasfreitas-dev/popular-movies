const cardContainer = document.querySelector(".card-container");

const movies = [
    {

    },
]

function renderMovies(movie) {
    const { title, image, rating, year, description, isFavorited } = movie

    cardContainer.innerHTML = `
    <div class="img-container">
        <img src=${image} alt="icone do filme">
    </div>
    <div class="container-movie">
        <h2 class="movie-title">${title} (${year})</h2>
        <div class="movie-icons">
            <div class="icons-container">
                <i class="fa-solid fa-star"></i>
                <span>${rating}</span>
            </div>
            <div class="icons-container">
                <i class="fa-regular fa-heart"></i>
                <span>Favoritar</span>
            </div>
        </div>
    </div>
    <div class="container-movie-desc">
        ${description}
    </div>
`;
}


