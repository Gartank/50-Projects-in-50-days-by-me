import Movie from './movie.jsx';

const categorySection = ( {movies} ) => {
    const movieList = movies.map( movie => <Movie movieData = {movie} />);

    return (
        <article className="category">
            {movieList}
        </article>
    )
}

function Catalog() {
    return (
        <section className="catalog">
            <categorySection />
        </section>
    )
}

export default Catalog;