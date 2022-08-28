import React from "react";

import ButtonIcon from "./ButtonIcon";

export default function Card({ data, list, changeNoteList, deleteNote, openEditNote }) {
	return (
		<div className="card" id={data.id}>
			<h3 className="card__title">{data.title}</h3>
			<h5 className="card__date">{data.createdAt}</h5>
			<p className="card__text">{data.body}</p>
			<div className="card__button-container">
				<button
					className="card__button-delete card__button"
					onClick={openEditNote}
					id={data.id}
				>
					<i className="fi fi-rs-book-arrow-right" id={data.id}></i>
				</button>
				<button
					className="card__button-delete card__button"
					onClick={deleteNote}
					id={data.id}
				>
					<i
						className="fi fi-rs-trash"
						onClick={deleteNote}
						id={data.id}
					></i>
				</button>
				<ButtonIcon
					list={list}
					id={data.id}
					changeNoteList={changeNoteList}
					deleteNote={deleteNote}
				/>
			</div>
		</div>
	);
}
