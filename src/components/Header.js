import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext, inActiveButtonStyle } from "../utils";
import "../styles/Header.scss";

export default function Header() {
	const [buttonStyle, setStyle] = useState(inActiveButtonStyle);
	const { algoType, running, dispatch } = useContext(AppContext);
	const ref = useRef();

	useEffect(() => {
		const length = Object.keys(buttonStyle).length;

		if (!algoType && !length) setStyle(inActiveButtonStyle);
		else if (algoType && length) setStyle({});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [algoType]);

	useEffect(() => {
		ref.current.innerText = running ? "stop" : "start";
	}, [running]);

	const handleChange = () => {
		dispatch({ type: ref.current.innerText });
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
