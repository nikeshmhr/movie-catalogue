import React from "react";
import MovieListWrapper from "./MovieListWrapper";
import Search from "./Search";
import "./Loader.css";
import { Router, Switch, Route } from "react-router-dom";
import history from "./router/history";
import MovieDetail from "./MovieDetail";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { searchTerm: "", movies: [], error: "", loading: false };
	}

	searchHandler(e) {
		e.preventDefault();

		if (this.state.searchTerm) {
			this.setState({ error: "", loading: true });
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
				<Router history={history}>
					<Switch>
						<Route path="/" exact>
							<Search
								value={this.state.searchTerm}
								changeHandler={this.changeHandler.bind(this)}
								searchHandler={this.searchHandler.bind(this)}
							/>
							{viewToRender}
						</Route>
						<Route path="/:imdbID" exact>
							<MovieDetail />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}
