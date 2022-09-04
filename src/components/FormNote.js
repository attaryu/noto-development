import React from "react";
import moment from "moment";

export default class FormNote extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			title: "",
			body: "",
			archived: false,
			createdAt: null,
		};

		this.onTitleInputHandler = this.onTitleInputHandler.bind(this);
		this.onBodyInputHandler = this.onBodyInputHandler.bind(this);
		this.sendData = this.sendData.bind(this);
	}

	onTitleInputHandler(event) {
		if (event.target.value.length <= 50) {
			this.setState(() => {
				return {
					title: event.target.value,
				};
			});
		}
	}

	onBodyInputHandler(event) {
		this.setState(() => {
			return {
				body: event.target.value,
			};
		});
	}

	sendData(event) {
		event.preventDefault();
		document.querySelector(".bg-form").classList.remove("bg-form--active");

		this.setState(() => {
			if (!this.state.id) {
				return {
					id: Math.floor(new Date() / Math.random()),
					createdAt: moment().format("DD MMM YYYY, h:mm a"),
				};
			} else {
				return {
					createdAt: moment().format("DD MMM YYYY, h:mm a"),
				};
			}
		});

		setTimeout(() => {
			this.props.receiveData(this.state);

			this.setState(() => {
				return {
					id: null,
					title: "",
					body: "",
					createdAt: null,
				};
			});
		}, 50);
	}

	render() {
		const limit =
			this.state.title.length === 50
				? "pop-up-form__limit pop-up-form__limit--max"
				: "pop-up-form__limit";

		return (
			<div className="bg-form" onSubmit={this.sendData}>
				<form className="pop-up-form">
					<div className="pop-up-form__header">
						<input
							type="text"
							placeholder="Title..."
							className="pop-up-form__input-title"
							value={this.state.title}
							onInput={this.onTitleInputHandler}
							required
						/>
						<p className={limit}>{this.state.title.length}/50</p>
					</div>
					<div className="pop-up-form__body">
						<textarea
							className="pop-up-form__text-area"
							placeholder="Note..."
							value={this.state.body}
							onInput={this.onBodyInputHandler}
						></textarea>
					</div>
					<div className="pop-up-form__footer">
						<button
							className="pop-up-form__cancel"
							onClick={this.props.cancelSendData}
							id="bg-form"
						>
							Cancel
						</button>
						<button className="pop-up-form__save">Save</button>
					</div>
				</form>
			</div>
		);
	}
}
