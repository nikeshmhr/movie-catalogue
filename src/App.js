import React from "react";
import MovieListWrapper from "./MovieListWrapper";
import Search from "./Search";
import "./Loader.css";
import { Router, Switch, Route } from "react-router-dom";
import history from "./router/history";
import MovieDetail from "./MovieDetail";
import Pagination from "./Pagination";
import { connect } from "react-redux";
import { searchMovie } from "./actions";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: "",
			currentPage: 1
		};
	}

	searchHandler(e) {
		e.preventDefault();

		if (this.state.searchTerm) {
			this.setState({ currentPage: 1 });
			this.fetchMovies();
		}
	}

	fetchMovies(pageNo = 1) {
		this.props.searchMovie(this.state.searchTerm, pageNo);
	}

	paginationHandler(pageNo) {
		this.fetchMovies(pageNo);
		this.setState({ currentPage: pageNo });
	}

	changeHandler(e) {
		this.setState({ searchTerm: e.target.value });
	}

	render() {
		const { loading, error, movies, totalResults } = this.props;

		const viewToRender =
			loading && !error ? (
				<div className="lds-ripple">
					<div></div>
					<div></div>
				</div>
			) : error ? (
				<div className="error-message">{this.state.error}</div>
			) : (
				<div>
					<MovieListWrapper movies={movies} />
					<Pagination
						totalResults={totalResults}
						paginationHandler={this.paginationHandler.bind(this)}
						currentPage={this.state.currentPage}
					/>
				</div>
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

const mapStateToProps = ({ movies, error, loading, totalResults }) => {
	return {
		movies,
		error,
		loading,
		totalResults
	};
};

const mapDispatchToProps = { searchMovie };

export default connect(mapStateToProps, mapDispatchToProps)(App);
