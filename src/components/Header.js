import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext, inActiveButtonStyle } from "../utils";
import "../styles/Header.scss";

export default function Header() {
	const [buttonStyle, setStyle] = useState(inActiveButtonStyle);
	const { algoType, running, dispatch } = useContext(AppContext);
	const ref = useRef();
	const [wait, setWait] = useState(false);
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

			if (ref.current.innerText === "stop" && Algorithms[algoType].pause)
				dispatch({ type: ref.current.innerText });
			else if (ref.current.innerText === "start")
				dispatch({ type: ref.current.innerText });
		}
	};

	return <HeaderUI {...{ buttonStyle, handleChange, ref }} />;
}

const HeaderUI = React.forwardRef(({ buttonStyle, handleChange }, ref) => {
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
});

const Algorithms = {
	"Merge Sort": {
		pause: true,
	},
	"Bubble Sort": {
		pause: true,
	},
	"Quick Sort": {
		pause: false,
	},
	"Heap Sort": {
		pause: false,
	},
};
