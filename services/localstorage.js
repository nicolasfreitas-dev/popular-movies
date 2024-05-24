const localStorageKey = "favoriteMovies";

function getFavoriteMovies () {
    return JSON.parse(localStorage.getItem(localStorageKey));
}

function saveToLocalStorage (movie) {
    const movies = getFavoriteMovies() || [];
    movies.push(movie);
    
    const moviesJSON = JSON.stringify(movies);
    localStorage.setItem(localStorageKey, moviesJSON);
}