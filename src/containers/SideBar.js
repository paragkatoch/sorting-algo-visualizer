import React, { useContext, useEffect, useRef, useState } from "react";

import Sliders from "./Sliders";
import AlgoDropDown from "../components/AlgoDropDown";

import { AppContext, inActiveButtonStyle } from "../utils";
import "../styles/SideBar.scss";

export default function SideBar() {
	const [deadState, setDeadState] = useState({});
	const { running, dispatch } = useContext(AppContext);
	const ref = useRef();

	useEffect(() => {
		const length = Object.keys(deadState).length;

		if (running && !length) setDeadState(inActiveButtonStyle);
		else if (!running && length) setDeadState({});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [running]);

	const handleClick = (event) => {
		dispatch({ type: "reset" });
	};

	const handleVisibility = () => {
		ref.current.classList.toggle("sidebar_container_action");
	};

	return (
		<section className="Sidebar">
			<button
				id="show"
				className="visibility_button"
				onClick={handleVisibility}
			>
				<img src="/menuOpen.svg" alt="" />
			</button>

			<div ref={ref} className="sidebar_container">
				<section className="sidebar_main">
					<button
						style={deadState}
						className="newArray button-style button-action"
						onClick={handleClick}
					>
						<p>New Array</p>
					</button>

					<AlgoDropDown deadState={deadState} />
					<Sliders />

					<button className="visibility_button" onClick={handleVisibility}>
						<img src="/menuClose.svg" alt="" />
					</button>
				</section>
			</div>
		</section>
	);
}
