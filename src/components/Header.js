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

	render() {
		return (
			<header className="header">
				<p className="header__text">Search in here :</p>
				<div className="search-bar">
					<input
						type="text"
						placeholder="by title..."
						onInput={this.onInputHandler}
						onBlur={this.props.resetTemporary}
						value={this.state.search}
						className="search-bar__input"
					/>
				</div>
			</header>
		);
	}
}
