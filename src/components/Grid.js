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

	useEffect(() => {
		console.log("update");
	}, [array]);
	useEffect(() => {
		window.addEventListener("resize", setWidthHeight);
		setWidthHeight();

		return () => {
			window.removeEventListener("resize", setWidthHeight);
		};
	}, []);

	useEffect(() => {
		if (running) {
			bubbleSort(array, array.length, setArray);
		}
	}, [running]);

	const setWidthHeight = () => {
		const { clientWidth, clientHeight } = gridRef.current;
		setGridSize({ clientWidth, clientHeight });
	};

	return (
		<div className="Grid">
			<div ref={gridRef} className="grid_container">
				<div className="ruler"></div>
				<div className="arrayBars">
					{array.map((bar, i, bars) => {
						return (
							<div
								className="bar"
								key={i}
								id={`${bar} ${gridSize.clientHeight} ${size}`}
								style={{
									height: `${getBarHeight(bar, size, gridSize.clientHeight)}px`,
									width: `${getBarWidth(bars.length, gridSize.clientWidth)}px`,
									backgroundColor: "#1C62A3",
									margin: `${getBarMargin(
										bars.length,
										gridSize.clientWidth
									)}px`,
								}}
							>
								{setHeightValue(bar, bars.length, gridSize.clientWidth)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

const getBarHeight = (bar, size, height) =>
	(bar / (Math.ceil(size / 3) * 100)) * (height * 0.7);

const getBarWidth = (length, width) => (width * 0.5) / length;

const getBarMargin = (length, width) => Math.min((width * 0.24) / length, 20);

const setHeightValue = (bar, length, width) => {
	const barWidth = getBarWidth(length, width);
	let size = 20;
	if (barWidth > 25) {
		if (barWidth < 40) size = 12;
		else if (barWidth < 80) size = 16;
		return <p style={{ fontSize: `${size}px` }}>{bar}</p>;
	}
	return null;
};

/*
	size
	1 - 4
	2 - 10
	3 - 18
	4 - 28
	5 - 35
	6 - 48
	7 - 63

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

const bubbleSort = async (array, n, setArray) => {
	let arr = array;
	console.log("start", arr, arr[0], arr[1], arr[2], arr[3]);

	var i, j;
	for (i = 0; i < n - 1; i++)
		for (j = 0; j < n - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				setArray(arr);
			}
		}
	console.log("finish", arr);
};
