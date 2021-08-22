/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import {
	AppContext,
	getBarHeight,
	getBarMargin,
	getBarWidth,
	setHeightValue,
} from "../utils";

export default function ArrayBars({ gridSize }) {
	const [i, setI] = useState(-1);
	const [j, setJ] = useState(-1);
	const { array, size, running, dispatch } = useContext(AppContext);

	const length = array.length;

	useEffect(() => {
		if (running) setI(0);
	}, [running]);

	useEffect(() => {
		console.log(i, j);
	}, [i, j]);

	useEffect(() => {
		if (running) {
			if (i >= length - 1) {
				dispatch({ type: "stop" });
			}
			setTimeout(() => {
				setJ(0);
			}, 200);
		}
	}, [i]);

	useEffect(() => {
		if (running && i >= 0) {
			if (j >= length - i - 1) {
				setI((prev) => prev + 1);
			} else {
				if (array[j] > array[j + 1]) {
					let arr = array;
					let temp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = temp;

					dispatch({ type: "array", data: arr });
				}
				setTimeout(() => {
					setJ((prev) => prev + 1);
				}, 200);
			}
		}
	}, [j]);

	return <ArrayBarsUI {...{ array, gridSize, size }} />;
}

function ArrayBarsUI({ array, gridSize, size }) {
	return (
		<>
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
							margin: `${getBarMargin(bars.length, gridSize.clientWidth)}px`,
						}}
					>
						{setHeightValue(bar, bars.length, gridSize.clientWidth)}
					</div>
				);
			})}
		</>
	);
}

/*
	Array size
	4*1 5*2 6*3 7*4 7*5	
	8*6 9*7 10*8 11*9 12*10
	
	array range
	(1,2,3) : 10 - 100
	(3,4,5) : 10 - 200
	(6,7,8) : 10 - 300
	(9,10)  : 10 - 400
*/
