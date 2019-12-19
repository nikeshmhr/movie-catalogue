import React from "react";
import MovieSummary from "./MovieSummary";

class MovieListWrapper extends React.Component {
	render() {
		return (
			<div className="movie-wrapper">
				{this.props.movies.map(
					({ Title, Poster, Year, imdbID: id }) => (
						<MovieSummary
							key={id}
							title={Title}
							poster={Poster}
							year={Year}
						/>
					)
				)}
			</div>
		);
	}
}

export default MovieListWrapper;
