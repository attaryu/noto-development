import React from "react";
import moment from "moment";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Note from "./Note";
import AddNote from "./AddNote";
import FormNote from "./FormNote";
import EditNote from "./EditNote";
import PopUpNotif from "./PopUpNotif";

import notif from "../utils/notif";
import { store, getItem } from "../restore-data";

export default class Container extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [
				{
					id: 1981038154679,
					title: "Archived",
					body: "Disini adalah tempat arsip catatan anda",
					archived: true,
					createdAt: moment().format("DD MMM YYYY, h:mm a"),
				},
				{
					id: 2675335065968,
					title: "Nōto",
					body: "Nōto adalah aplikasi catatan berbasis web yang menyimpan catatan anda ke dalam cache browser",
					archived: false,
					createdAt: moment().format("DD MMM YYYY, h:mm a"),
				},
				{
					id: 213896423748,
					title: "Notabene",
					body: "Kamu mulai menambah catatan di page main",
					archived: false,
					createdAt: moment().format("DD MMM YYYY, h:mm a"),
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

		setTimeout(() => {
			store(this.state.data);
		}, 0);
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

		setTimeout(() => {
			store(this.state.data);
		}, 0);
	}

	deleteNote(event) {
		const id = event.target.getAttribute("id");
		this.setState((prev) => {
			return {
				data: prev.data.filter((item) => item.id !== parseInt(id)),
			};
		});
		notif("Note deleted");

		setTimeout(() => {
			store(this.state.data);
		}, 0);
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

		setTimeout(() => {
			store(this.state.data);
		}, 0);
	}

	componentDidMount() {
		if (getItem() === null || getItem() === undefined) {
			store(this.state.data);
		} else {
			this.setState((prev) => {
				return {
					data: [...getItem()],
				};
			});
		}
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
