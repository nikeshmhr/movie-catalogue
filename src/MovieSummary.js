import React from "react";
import history from "./router/history";

class MovieSummary extends React.Component {
	constructor(props) {
		super(props);
	}

	movieSelected(id) {
		history.push(`/${id}`);
	}

	render() {
		const { title, poster, year, imdbID } = this.props;
		return (
			<div className="movie" onClick={() => this.movieSelected(imdbID)}>
				<img src={poster} alt={title} />
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p>{year}</p>
				</div>
			</div>
		);
	}
}

export default MovieSummary;
