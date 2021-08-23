/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils";

export default function BubbleSort(props) {
	const [i, setI] = useState();
	const [j, setJ] = useState();
	const [paused, setPaused] = useState();
	const [cords, setCords] = useState();

	const { array, running, size, speed, newArray, algoType, dispatch } =
		useContext(AppContext);
	const sortingSpeed = 30 * speed;
	console.log(speed, sortingSpeed);

	const length = array.length;

	function reset() {
		setI(-1);
		setJ(-1);
		setPaused(false);
		setCords({ i: -1, j: -1 });
	}

	// set values on mount
	useEffect(reset, []);

	// reset values if size, array or algorithm are changed
	useEffect(() => {
		if (paused) reset();
	}, [size, newArray, algoType]);

	// Controls algorithm start, stop and restart state
	useEffect(() => {
		// on restart
		if (paused && running) setI(-100);
		// on start
		else if (running)
			if (i === -1) setI(0);
			else setI((prev) => prev);
		// on stop
		else if (i > -1) {
			setPaused(true);
			setCords({ i, j });
		}
	}, [running]);

	// outer for loop
	useEffect(() => {
		// set i to saved value on restart
		if (i === -100) setI(cords.i);
		else if (running) {
			// on complete
			if (i >= length - 1) {
				dispatch({ type: "stop" });
				setI(-1);
				setJ(-1);
			}
			// on restart set j to different value
			else if (paused) {
				setTimeout(() => {
					setJ(-100);
					setPaused(false);
				}, sortingSpeed);
			} else {
				setTimeout(() => {
					setJ(0);
				}, sortingSpeed);
			}
		}
	}, [i]);

	// inner for loop
	useEffect(() => {
		if (j === -100) setJ(cords.j);
		else if (running && i >= 0)
			if (j >= length - i - 1) setI((prev) => prev + 1);
			else {
				if (array[j][0] > array[j + 1][0]) {
					let arr = array;
					let temp = arr[j][0];
					arr[j][0] = arr[j + 1][0];
					arr[j + 1][0] = temp;

					dispatch({ type: "array", data: arr });
				}
				setTimeout(() => {
					setJ((prev) => prev + 1);
				}, sortingSpeed);
			}
	}, [j]);

	return <props.childComponent {...props.childProps} />;
}
