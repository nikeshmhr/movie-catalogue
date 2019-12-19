import React from "react";
import MovieListWrapper from "./MovieListWrapper";
import Search from "./Search";
import "./Loader.css";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { searchTerm: "", movies: [], error: "", loading: true };
	}

	searchHandler(e) {
		e.preventDefault();
		console.log(this.state.searchTerm);
		this.setState({ error: "", loading: true });
		if (this.state.searchTerm) {
			// Call api to search movies
			fetch(
				`http://www.omdbapi.com/?apikey=c32f98b8&type=movie&s=${this.state.searchTerm}`
			).then(res => {
				res.json().then(json => {
					this.setState({ loading: false });

					if (json.Response === "True") {
						this.setState({
							movies: [
								...json.Search.sort(
									({ Title: a }, { Title: b }) =>
										a < b ? -1 : a > b ? 1 : 0
								)
							],
							error: ""
						});
					} else {
						this.setState({ movies: [], error: json.Error });
					}
				});
			});
		}
	}

	changeHandler(e) {
		this.setState({ searchTerm: e.target.value });
	}

	render() {
		const { loading, error, movies } = this.state;

		const viewToRender =
			loading && !error ? (
				<div className="lds-ripple">
					<div></div>
					<div></div>
				</div>
			) : error ? (
				<div className="error-message">{this.state.error}</div>
			) : (
				<MovieListWrapper movies={movies} />
			);
		return (
			<div className="container">
				<Search
					value={this.state.searchTerm}
					changeHandler={this.changeHandler.bind(this)}
					searchHandler={this.searchHandler.bind(this)}
				/>
				{viewToRender}
			</div>
		);
	}
}
