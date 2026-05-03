

function Movie ({movieData}) {
    return (
        <div class="movie">
            <figure class="movie-poster">
                <img src={movieData.img} alt=""/>
                <figcaption class="movie-title">{movieData.title}</figcaption>
            </figure>
            <div class="movie-details">
                <div class="description-genre">{movieData.genre.join(",")}</div>
                <div class="description-rating">`${movieData.rating}/10 `</div>
                <div class="description-year">{movieData.date}</div>
            </div>
        </div>
    )
}

export default Movie;