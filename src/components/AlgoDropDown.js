import React, { useContext, useRef } from "react";

import { AppContext } from "../utils";
import "../styles/AlgoDropDown.scss";
import DownArrow from "../assets/downArrow.svg";

const algorithms = ["Merge Sort", "Heap Sort", "Quick Sort", "Bubble Sort"];
let current = "Type of algorithm";

export default function AlgoDropDown({ deadState }) {
	const { algoType, running, dispatch } = useContext(AppContext);

	const containerRef = useRef();
	const optionRef = useRef();

	current = algoType || current;

	const handleChange = (e) => {
		optionRef.current.className = "algoDropDown_options";
		containerRef.current.classList.toggle("algoDropDown_interaction");

		setTimeout(() => {
			containerRef.current.classList.toggle("algoDropDown_interaction");
		}, 100);

		dispatch({ type: "algoType", data: e.target.id });
	};

	const handleClick = () => {
		if (!running)
			setTimeout(() => {
				optionRef.current.classList.toggle(
					"algoDropDown_container_interaction"
				);
			}, 100);
	};

	return (
		<AlgoDropDownUI
			{...{
				ref: { containerRef, optionRef },
				deadState,
				handleClick,
				current,
				running,
				handleChange,
			}}
		/>
	);
}

const AlgoDropDownUI = React.forwardRef(
	(props, { containerRef, optionRef }) => {
		const options = algorithms.map((algo, i) => (
			<li key={i}>
				<button id={algo} onClick={props.handleChange}>
					{algo}
				</button>
				{i < algorithms.length - 1 && <hr />}
			</li>
		));

		return (
			<section
				ref={containerRef}
				className="algoDropDown_container algoDropDown_interaction"
			>
				<button
					style={props.deadState}
					className="algoDropDown_button button-style button-action"
					onClick={props.handleClick}
				>
					<p>{props.current}</p>
					<img src={DownArrow} alt="Down Arrow" />
				</button>

				{!props.running && (
					<div className="algoDropDown_options" id="options" ref={optionRef}>
						<ul className="options">{options}</ul>
					</div>
				)}
			</section>
		);
	}
);
