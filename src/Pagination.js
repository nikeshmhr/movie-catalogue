import React from "react";

const RESULT_PER_PAGE = 10;

class Pagination extends React.Component {
	pageNumberClicked(pageNo) {
		this.props.paginationHandler(pageNo);
	}

	preparePaginationView() {
		const noOfPages = Math.ceil(this.props.totalResults / RESULT_PER_PAGE);

		const itemsToRender = [];
		for (let i = 1; i <= noOfPages; i++) {
			let styleClass = "page-item";
			styleClass += this.props.currentPage === i ? " active" : "";

			itemsToRender.push(
				<li
					className={styleClass}
					key={`${i}-link`}
					onClick={() => this.pageNumberClicked(i)}
				>
					<a className="page-link">{i}</a>
				</li>
			);
		}

		return itemsToRender;
	}

	render() {
		const { totalResults } = this.props;

		if (!totalResults) {
			return null;
		}

		return (
			<nav className="overflow-auto" aria-label="Pagination">
				<ul className="pagination">{this.preparePaginationView()}</ul>
			</nav>
		);
	}
}

export default Pagination;
