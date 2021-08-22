import React from "react";

import Controller from "./Controller";
import Grid from "./Grid";
import "../styles/Main.scss";

export default function Main() {
	// console.log("Main");
	return (
		<main className="Main">
			<Grid />
			<Controller />
		</main>
	);
}
