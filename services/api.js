import { apiKey } from "../env/key.js"

async function searchMovieByName(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&language=en-US&page=1`

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status ${response.status}`);
        }
        
        const data = await response.json();

        return data.results;
    } catch (error) {
        console.error("Error fetching popular movies", error);
        return [];
    }
}

async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status ${response.status}`);
        }
        
        const data = await response.json();

        return (data.results);
    } catch (error) {
        console.error("Error fetching popular movies", error);
        return [];
    }
}

export const API = {
    getPopularMovies,
    searchMovieByName
}