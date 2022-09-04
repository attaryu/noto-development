import React from "react";

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			search: "",
		};

		this.onInputHandler = this.onInputHandler.bind(this);
	}

	onInputHandler(event) {
		this.props.getSearch(event.target.value);

		if (event.target.value.length <= 50) {
			this.setState(() => {
				return {
					search: event.target.value,
				};
			});
		}
	}

	clickSideBar() {
		document.querySelector(".sidebar").classList.toggle("sidebar--active");
		document
			.querySelector(".search-bar")
			.classList.toggle("search-bar--width");

		document
			.querySelectorAll(".header__span-icon")
			.forEach((item) => item.classList.toggle("header__span-icon--active"));

		document
			.querySelector(".header__button-sidebar")
			.classList.toggle("header__button-sidebar--active");
	}

	render() {
		return (
			<header className="header">
				<button
					className="header__button-sidebar"
					onClick={this.clickSideBar}
				>
					<span className="header__span-icon"></span>
					<span className="header__span-icon"></span>
					<span className="header__span-icon"></span>
				</button>
				<div className="header__wrapper">
					<div className="search-bar">
						<input
							type="text"
							placeholder="search by title..."
							onInput={this.onInputHandler}
							onBlur={this.props.resetTemporary}
							value={this.state.search}
							className="search-bar__input"
						/>
					</div>
				</div>
			</header>
		);
	}
}
