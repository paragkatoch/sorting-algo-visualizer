import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext, inActiveButtonStyle } from "../utils";
import "../styles/Header.scss";

export default function Header() {
	console.log("Header");
	const { algoType, running, dispatch } = useContext(AppContext);

	const [buttonStyle, setStyle] = useState(inActiveButtonStyle);
	const ref = useRef();

	useEffect(() => {
		if (algoType === "" && Object.keys(buttonStyle).length === 0) {
			setStyle(inActiveButtonStyle);
		} else if (algoType !== "" && Object.keys(buttonStyle).length > 0) {
			setStyle({});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [algoType]);

	useEffect(() => {
		running
			? (ref.current.innerText = "stop")
			: (ref.current.innerText = "start");
	}, [running]);

	const handleChange = () => {
		const text = ref.current.innerText;
		dispatch({ type: text });
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
