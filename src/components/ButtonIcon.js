import React from "react";

export default function ButtonIcon({ id, list, changeNoteList }) {
	if (list === "main") {
		return (
			<button
				className="card__button-unarchive card__button"
				id={id}
				onClick={changeNoteList}
			>
				<i className="fi fi-rs-folder-download" id={id}></i>
			</button>
		);
	} else {
		return (
			<button
				className="card__button-unarchive card__button"
				id={id}
				onClick={changeNoteList}
			>
				<i className="fi fi-rs-folder-upload" id={id}></i>
			</button>
		);
	}
}
