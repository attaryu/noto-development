import React from "react";

import Card from "./Card";
import NoNote from "./NoNote";

export default function Note({ data, list, temporary, changeNoteList, deleteNote, openEditNote }) {
	const newDatas =
		temporary.length === 0 || temporary[0] !== "404"
			? data.filter((item) => item.archived === (list !== "main"))
			: [];

	if (temporary.length !== 0 && temporary[0] !== "404") {
		return (
			<div className="note">
				{temporary.map((item) => (
					<Card
						data={item}
						key={item.id}
						list={list}
						changeNoteList={changeNoteList}
						deleteNote={deleteNote}
					/>
				))}
			</div>
		);
	} else if (newDatas.length !== 0) {
		return (
			<div className="note">
				{newDatas.map((item) => (
					<Card
						data={item}
						key={item.id}
						list={list}
						changeNoteList={changeNoteList}
						deleteNote={deleteNote}
						openEditNote={openEditNote}
					/>
				))}
			</div>
		);
	} else {
		return <NoNote />;
	}
}
