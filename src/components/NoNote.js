import React from "react";

export default function NoNote() {
	return (
		<div className="no-note">
			<i className="fi fi-rs-search-alt no-note__icon"></i>
			<p className="no-note__text">
				Note <br />
				not <br />
				found.
			</p>
		</div>
	);
}
