import React from "react";
import moment from "moment";

export default class EditNote extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.noteEdit.id,
			title: this.props.noteEdit.title,
			body: this.props.noteEdit.body,
			archived: this.props.noteEdit.archived,
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
		this.setState(() => {
			return {
				createdAt: moment().format("DD MMM YYYY, h:mm a"),
			};
		});

		document
			.querySelector(".bg-form-edit")
			.classList.remove("bg-form-edit--active");

		setTimeout(() => {
			this.props.receiveDataEdit(this.state);
		}, 50);
	}

	render() {
		const limit =
			this.state.title.length === 50
				? "pop-up-form__limit pop-up-form__limit--max"
				: "pop-up-form__limit";

		return (
			<div className="bg-form-edit" onSubmit={this.sendData}>
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
							id="bg-form-edit"
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
