import React from "react";

const MovieSummary = ({ title, poster, year }) => {
	return (
		<div className="movie">
			<img src={poster} />
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<p>{year}</p>
			</div>
		</div>
	);
};

export default MovieSummary;
