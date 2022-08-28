import React from "react";

export default function AddNote() {
	const onClickHandler = () => {
		document.querySelector(".bg-form").classList.add("bg-form--active");
	};

	return (
		<div className="add-note">
			<button className="add-note__button" onClick={onClickHandler}>
				<span className="add-note__icon"></span>
				<span className="add-note__icon"></span>
			</button>
		</div>
	);
}
