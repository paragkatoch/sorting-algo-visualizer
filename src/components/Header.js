import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext, inActiveButtonStyle, Algorithm } from "../utils";
import "../styles/Header.scss";

export default function Header() {
	const [wait, setWait] = useState(false);
	const [buttonStyle, setStyle] = useState(inActiveButtonStyle);

	const { algoType, running, dispatch } = useContext(AppContext);
	const ref = useRef();

	const length = Object.keys(buttonStyle).length;

	useEffect(() => {
		if (!algoType && !length) setStyle(inActiveButtonStyle);
		else if (algoType && length) setStyle({});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [algoType]);

	useEffect(() => {
		if (wait && !length) {
			setStyle(inActiveButtonStyle);
		} else if (!wait && length && algoType) {
			setStyle({});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wait]);

	useEffect(() => {
		if (ref.current) ref.current.innerText = running ? "stop" : "start";
	}, [running]);

	const handleChange = () => {
		if (!wait) {
			if (ref.current.innerText === "stop") {
				setWait(true);
				setTimeout(() => {
					setWait(false);
				}, [500]);
			}

			if (ref.current.innerText === "stop") {
				if (Algorithm[algoType].pause)
					dispatch({ type: ref.current.innerText });
				else
					alert(
						`Stopping functionality for ${algoType} Sort is under construction.\nAlthough the sorting is paused right now 😋.`
					);
			} else if (ref.current.innerText === "start")
				dispatch({ type: ref.current.innerText });
		}
	};

	return <HeaderUI {...{ buttonStyle, handleChange, ref }} />;
}

const HeaderUI = React.forwardRef(({ buttonStyle, handleChange }, ref) => {
	return (
		<header className="MainHeader">
			<div className="app_name">
				<a href="https://github.com/paragkatoch/sorting-algo-visualizer">
					<h1>Sorting Algorithm Visualizer</h1>
				</a>
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
});
