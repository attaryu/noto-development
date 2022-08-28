import React from "react";

export default function Navigation({ sendingListMode }) {
	const onClickHandler = (event) => {
		document
			.querySelectorAll(".navigation__list-item")
			.forEach((item) =>
				item.classList.remove("navigation__list-item--active")
			);

		if (!event.target.classList.contains("navigation__list-item")) {
			sendingListMode(event.target.parentNode.getAttribute("id"));
		} else {
			sendingListMode(event.target.getAttribute("id"));
		}

		setTimeout(() => {
			if (!event.target.classList.contains("navigation__list-item")) {
				event.target.parentNode.classList.add(
					"navigation__list-item--active"
				);
			} else {
				event.target.classList.add("navigation__list-item--active");
			}
		}, 150);
	};

	return (
		<nav className="navigation">
			<ul className="navigation__list-container">
				<li
					className="navigation__list-item navigation__list-item--active"
					onClick={onClickHandler}
					id="main"
				>
					<i className="fi fi-rs-duplicate navigation__icon" alt=""></i>
					<p>Main</p>
				</li>
				<li
					className="navigation__list-item"
					onClick={onClickHandler}
					id="archived"
				>
					<i className="fi fi-rs-folder navigation__icon" alt=""></i>
					<p>Archived</p>
				</li>
			</ul>
		</nav>
	);
}
