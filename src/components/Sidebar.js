import React from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Sidebar({ sendingListMode }) {
	return (
		<section className="sidebar">
			<Logo />
			<Navigation sendingListMode={sendingListMode} />
		</section>
	);
}
