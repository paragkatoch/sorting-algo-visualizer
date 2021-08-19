import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext, inActiveButtonStyle } from "../utils";
import "../styles/Header.scss";

export default function Header() {
	const [buttonStyle, setStyle] = useState(inActiveButtonStyle);
	const {
		state: { algoType },
		dispatch,
	} = useContext(AppContext);
	const ref = useRef();

	useEffect(() => {
		console.log("I am Header.js");
	}, []);

	useEffect(() => {
		console.log(algoType);
		algoType !== "" && setStyle({});
	}, [algoType]);

	const handleChange = () => {
		const text = ref.current.innerText;
		dispatch({ type: text });
		ref.current.innerText = text === "start" ? "stop" : "start";
	};

	return (
		<header className="MainHeader">
			<div className="app_name">
				<h1>Sorting Algorithm Visualizer</h1>
			</div>
			<div className="divider"></div>
			<div className="start_container">
				<button
					style={buttonStyle}
					className="start button-style button-action"
					onClick={handleChange}
				>
					<p ref={ref}>start</p>
				</button>
			</div>
		</header>
	);
}
