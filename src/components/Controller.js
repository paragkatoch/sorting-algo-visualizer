import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "./Slider";
import "../styles/Controller.scss";

import { AppContext, inActiveButtonStyle } from "../utils";

export default function Controller() {
	console.log("Controller");

	const [deadState, setDeadState] = useState({});
	const { running, size, speed, algoType, dispatch } = useContext(AppContext);
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
	const handleSliderChange = (type, value) => {
		const data = Number(value);
		dispatch({ type, data });
	};
	const handleVisibility = () => {
		ref.current.classList.toggle("controller_container_action");
	};

	return (
		<section className="Controller">
			<button
				id="show"
				className="visibility_button"
				onClick={handleVisibility}
			>
				<img src="/menuOpen.svg" alt="" />
			</button>
			<div ref={ref} className="controller_container">
				<section className="controller_main">
					<button
						style={deadState}
						className="newArray button-style button-action"
						onClick={handleClick}
					>
						<p>New Array</p>
					</button>
					<AlgoOptions {...{ algoType, running, dispatch, deadState }} />
					<Sliders {...{ size, speed, handleSliderChange }} />
					<button className="visibility_button" onClick={handleVisibility}>
						<img src="/menuClose.svg" alt="" />
					</button>
				</section>
			</div>
		</section>
	);
}

function AlgoOptions({ deadState, algoType, running, dispatch }) {
	const current = algoType || "Type of algorithm";
	const containerRef = useRef();
	const optionRef = useRef();

	const algorithms = ["Merge Sort", "Heap Sort", "Quick Sort", "Bubble Sort"];

	const handleChange = (e) => {
		optionRef.current.className = "algoType_options";

		containerRef.current.classList.toggle("algoType_interaction");
		setTimeout(() => {
			containerRef.current.classList.toggle("algoType_interaction");
		}, 100);

		dispatch({ type: "algoType", data: e.target.id });
	};

	const handleClick = () => {
		!running &&
			setTimeout(() => {
				optionRef.current.classList.toggle("algoType_container_interaction");
			}, 100);
	};

	return (
		<section
			ref={containerRef}
			className="algoType_container algoType_interaction"
		>
			<button
				style={deadState}
				className="algoType_button button-style button-action"
				onClick={handleClick}
			>
				<p>{current}</p>
				<img src="/downArrow.svg" alt="Down Arrow" />
			</button>

			{!running && (
				<div className="algoType_options" id="options" ref={optionRef}>
					<ul className="options">
						{algorithms.map((algo, i) => (
							<li key={i}>
								<button id={algo} onClick={handleChange}>
									{algo}
								</button>
								{i < algorithms.length - 1 && <hr />}
							</li>
						))}
					</ul>
				</div>
			)}
		</section>
	);
}

function Sliders({ size, speed, handleSliderChange }) {
	const types = [
		{ name: "size", title: "Array size", value: size },
		{ name: "speed", title: "Sorting speed", value: speed },
	];

	return (
		<>
			{types.map(({ name, title, value }) => (
				<section key={name} className={`slider_${name}`}>
					<p>{title}</p>
					<Slider
						{...{
							value,
							name,
							handleSliderChange,
						}}
					/>
				</section>
			))}
		</>
	);
}
