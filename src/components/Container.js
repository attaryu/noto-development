import React from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Note from "./Note";
import AddNote from "./AddNote";
import FormNote from "./FormNote";
import EditNote from "./EditNote";
import PopUpNotif from "./PopUpNotif";

import notif from "../utils/notif";

export default class Container extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [
				{
					id: 1981038154679,
					title: "Babel",
					body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
					archived: true,
					createdAt: "08 Aug 2022, 5:46 am",
				},
				{
					id: 2675335065968,
					title: "Node JS",
					body: "Node.js adalah runtime environment untuk JavaScript yang bersifat open-source dan cross-platform. Dengan Node.js kita dapat menjalankan kode JavaScript di mana pun, tidak hanya terbatas pada lingkungan browser.",
					archived: false,
					createdAt: "09 Aug 2022, 5:46 am",
				},
				{
					id: 213896423748,
					title: "Express JS",
					body: "Express.js adalah framework web app untuk Node.js yang ditulis dengan bahasa pemrograman JavaScript. Framework open source ini dibuat oleh TJ Holowaychuk pada tahun 2010 lalu Express.js adalah framework back end. Artinya, ia bertanggung jawab untuk mengatur fungsionalitas website, seperti pengelolaan routing dan session, permintaan HTTP, penanganan error, serta pertukaran data di server",
					archived: false,
					createdAt: "10 Aug 2022, 6:11 am",
				},
			],
			temporary: [],
			noteEdit: [],
			list: "main",
		};

		this.receiveData = this.receiveData.bind(this);
		this.changeList = this.changeList.bind(this);
		this.getSearch = this.getSearch.bind(this);
		this.resetTemporary = this.resetTemporary.bind(this);
		this.changeNoteList = this.changeNoteList.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.openEditNote = this.openEditNote.bind(this);
		this.cancelSendData = this.cancelSendData.bind(this);
		this.receiveDataEdit = this.receiveDataEdit.bind(this);
	}

	receiveData(newData) {
		this.setState((prev) => {
			return {
				data: [...prev.data, { ...newData }],
				temporary: [],
				noteEdit: [],
			};
		});
		notif("Added note");
	}

	changeList(mode) {
		this.setState(() => {
			return {
				temporary: [],
				noteEdit: [],
				list: mode,
			};
		});
	}

	getSearch(search) {
		this.setState((prev) => {
			// eslint-disable-next-line array-callback-return
			let result = prev.data.filter((item) => {
				const title = item.title.toUpperCase();
				const input = search.toUpperCase();
				const list = this.state.list;

				if (title.match(input)) {
					if (list === "main" && item.archived === false) {
						return item;
					} else if (list === "archived" && item.archived === true) {
						return item;
					}
				}
			});

			if (result.length === 0) {
				result = ["404"];
			}

			return {
				temporary: [...result],
			};
		});
	}

	resetTemporary(event) {
		if (event.target.value.length === 0) {
			this.setState(() => {
				return {
					temporary: [],
				};
			});
		}
	}

	changeNoteList(event) {
		const id = event.target.getAttribute("id");
		this.setState((prev) => {
			return {
				data: prev.data.map((item) => {
					if (item.id === parseInt(id)) {
						if (item.archived === true) {
							notif("Moved to main");
						} else {
							notif("Moved to archive");
						}
						item.archived = item.archived ? false : true;
					}

					return item;
				}),
			};
		});
	}

	deleteNote(event) {
		const id = event.target.getAttribute("id");
		this.setState((prev) => {
			return {
				data: prev.data.filter((item) => item.id !== parseInt(id)),
			};
		});
		notif("Note deleted");
	}

	openEditNote(event) {
		const id = event.target.getAttribute("id");
		this.setState((prev) => {
			return {
				noteEdit: prev.data.filter((item) => item.id === parseInt(id)),
			};
		});

		setTimeout(() => {
			document
				.querySelector(".bg-form-edit")
				.classList.add("bg-form-edit--active");
		}, 10);
	}

	cancelSendData(event) {
		event.preventDefault();
		const target = event.target.getAttribute("id");

		if (target === "bg-form-edit") {
			document
				.querySelector(".bg-form-edit")
				.classList.remove("bg-form-edit--active");
		} else if (target === "bg-form") {
			document.querySelector(".bg-form").classList.remove("bg-form--active");
		}

		this.setState(() => {
			return {
				noteEdit: [],
			};
		});
	}

	receiveDataEdit(newData) {
		this.setState((prev) => {
			return {
				data: prev.data.map((item) => {
					if (item.id === newData.id) {
						return {
							id: newData.id,
							title: newData.title,
							body: newData.body,
							archived: newData.archived,
							createdAt: newData.createdAt,
						};
					} else {
						return { ...item };
					}
				}),
				noteEdit: [],
			};
		});
		notif("Note edited");
	}

	render() {
		if (this.state.noteEdit.length !== 0) {
			return (
				<>
					<Sidebar sendingListMode={this.changeList} />
					<main className="main">
						<Header
							resetTemporary={this.resetTemporary}
							getSearch={this.getSearch}
							list={this.state.list}
						/>
						<Note
							data={this.state.data}
							list={this.state.list}
							temporary={this.state.temporary}
							changeNoteList={this.changeNoteList}
							deleteNote={this.deleteNote}
							openEditNote={this.openEditNote}
						/>
					</main>
					<AddNote />
					<EditNote
						noteEdit={this.state.noteEdit[0]}
						cancelSendData={this.cancelSendData}
						receiveDataEdit={this.receiveDataEdit}
					/>
					<PopUpNotif />
				</>
			);
		} else if (this.state.noteEdit.length === 0) {
			if (this.state.list === "archived") {
				return (
					<>
						<Sidebar sendingListMode={this.changeList} />
						<main className="main">
							<Header
								resetTemporary={this.resetTemporary}
								getSearch={this.getSearch}
								list={this.state.list}
							/>
							<Note
								data={this.state.data}
								list={this.state.list}
								temporary={this.state.temporary}
								changeNoteList={this.changeNoteList}
								deleteNote={this.deleteNote}
								openEditNote={this.openEditNote}
							/>
						</main>
						<FormNote
							receiveData={this.receiveData}
							cancelSendData={this.cancelSendData}
						/>
						<PopUpNotif />
					</>
				);
			} else {
				return (
					<>
						<Sidebar sendingListMode={this.changeList} />
						<main className="main">
							<Header
								resetTemporary={this.resetTemporary}
								getSearch={this.getSearch}
								list={this.state.list}
							/>
							<Note
								data={this.state.data}
								list={this.state.list}
								temporary={this.state.temporary}
								changeNoteList={this.changeNoteList}
								deleteNote={this.deleteNote}
								openEditNote={this.openEditNote}
							/>
						</main>
						<AddNote />
						<FormNote
							receiveData={this.receiveData}
							cancelSendData={this.cancelSendData}
						/>
						<PopUpNotif />
					</>
				);
			}
		}
	}
}
