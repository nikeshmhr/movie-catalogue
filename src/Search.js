import React from "react";

class Search extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<form onSubmit={e => this.props.searchHandler(e)} className="form">
				<input
					type="text"
					className="form-control"
					placeholder="Search movies by name..."
					value={this.props.value}
					onChange={e => this.props.changeHandler(e)}
				/>
			</form>
		);
	}
}

export default Search;
