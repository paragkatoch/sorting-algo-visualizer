import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/Grid.scss";
import {
	AppContext,
	arrayGen,
	getBarHeight,
	getBarMargin,
	getBarWidth,
	setHeightValue,
} from "../utils";

export default function Grid() {
	const [gridSize, setGridSize] = useState();
	const gridRef = useRef();
	const { newArray, size, dispatch } = useContext(AppContext);

	useEffect(() => {
		if (newArray) {
			dispatch({ type: "array", data: arrayGen(size) });
			dispatch({ type: "reset" });
		}
	}, [newArray, size, dispatch]);

	useEffect(() => {
		window.addEventListener("resize", setWidthHeight);
		setWidthHeight();

		return () => {
			window.removeEventListener("resize", setWidthHeight);
		};
	}, []);

	const setWidthHeight = () => {
		const { clientWidth, clientHeight } = gridRef.current;
		setGridSize({ clientWidth, clientHeight });
	};

	return (
		<div className="Grid">
			<div ref={gridRef} className="grid_container">
				<div className="ruler"></div>
				<div className="arrayBars">
					<ArrayBars {...{ gridSize }} />
					{/* <BubbleSorter /> */}
				</div>
			</div>
		</div>
	);
}

const ArrayBars = ({ gridSize }) => {
	const [i, setI] = useState(-1);
	const [j, setJ] = useState(-1);
	const { array, size, running, dispatch } = useContext(AppContext);
	const length = array.length;

	useEffect(() => {
		console.log("triggered");
		if (running) {
			setI(0);
		}
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
