import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/Grid.scss";
import { AppContext } from "../utils";

export default function Grid() {
	console.log("Grid");
	const [array, setArray] = useState([]);
	const [gridSize, setGridSize] = useState();
	const gridRef = useRef();
	const { newArray, size, speed, algoType, running, dispatch } =
		useContext(AppContext);

	useEffect(() => {
		if (newArray) {
			setArray(arrayGen(size));
			dispatch({ type: "reset" });
		}
	}, [newArray, size, dispatch]);

	const abc = () => {
		const { clientWidth, clientHeight } = gridRef.current;
		setGridSize({ clientWidth, clientHeight });
	};

	useEffect(() => {
		window.addEventListener("resize", abc);
		abc();
	}, []);

	const arrayBars = array.map((bar, i, bars) => {
		return (
			<div
				className="bar"
				key={i}
				id={`${bar} ${gridSize.clientHeight} ${size}`}
				style={{
					height: `${getBarHeight(bar, size, gridSize.clientHeight)}px`,
					width: `${getBarWidth(bars.length, gridSize.clientWidth)}px`,
					borderRadius: "10%",
					backgroundColor: "#1C62A3",
					margin: `${getBarMargin(bars.length, gridSize.clientWidth)}px`,
				}}
			></div>
		);
	});

	return (
		<div className="Grid">
			<div ref={gridRef} className="grid_container">
				<div className="ruler"></div>
				<div
					className="arrayBars"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: "2",
					}}
				>
					{arrayBars}
				</div>
			</div>
		</div>
	);
}

const getBarHeight = (bar, size, height) =>
	(bar / (Math.ceil(size / 3) * 100)) * (height * 0.8);
const getBarWidth = (length, width) => (width * 0.4) / length;
const getBarMargin = (length, width) => Math.min((width * 0.25) / length, 20);

/*
	size
	4*1 5*2 6*3 7*4 7*5	
	8*6 9*7 10*8 11*9 12*10
	
	length
	10 - 100
	10 - 100
	10 - 100
	10 - 200
	10 - 200
	10 - 200
	10 - 300
	10 - 300
	10 - 300
	10 - 400
*/
const arrayGen = (size) => {
	let array = [];
	let range = (size > 5 ? size + 2 : size + 3) * size;

	for (let i = 1; i <= range; i++) {
		array.push(
			Math.floor(10 + Math.random() * (Math.ceil(size / 3) * 100 - 10))
		);
	}
	return array;
};
