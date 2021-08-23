/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils";

export default function BubbleSort(props) {
	const [i, setI] = useState();
	const [j, setJ] = useState();
	const [paused, setPaused] = useState();
	const [cords, setCords] = useState();
	const [, setUpdate] = useState(true);

	const { array, running, size, speed, newArray, algoType, dispatch } =
		useContext(AppContext);
	const sortingSpeed = (8 * (speed * speed)) / 2;
	console.log(speed, sortingSpeed);

	const length = array.length;

	/**
	 * set's default values
	 */
	function reset() {
		setI(-1);
		setJ(-1);
		setPaused(false);
		setCords({ i: -1, j: -1 });
	}

	/**
	 * force re-render component using state
	 */
	function forceUpdate() {
		setUpdate((prev) => !prev);
	}

	/**
	 *	dispatches and re-render the component
	 *
	 * @param {array} array global state array
	 * @param {boolean} update should component re-render
	 */
	function setArray(array, update) {
		dispatch({ type: "array", data: array });
		if (update) forceUpdate();
	}

	/**
	 *	set's the array state
	 *
	 * @param {number} index index of value to be change
	 * @param {number} state state value to set on the index
	 * @param {boolean} both whether to update index and index+1
	 * @param {boolean} update should component re-render
	 */
	function setArrayState(index, state, both = true, update = true) {
		let arr = array;
		if (both) {
			arr[index][1] = state;
			arr[index + 1][1] = state;
		} else {
			arr[index][1] = state;
		}
		setArray(arr, update);
	}

	/**
	 * swap and update array values and
	 * re-renders the component
	 *
	 * @param {number} index index to be swapped
	 */
	function swapAndSetArray(index) {
		let arr = array;
		let temp = arr[index][0];
		arr[index][0] = arr[index + 1][0];
		arr[index + 1][0] = temp;
		setArray(arr, true);
	}

	/**
	 * 		Logic
	 */

	// set values on mount
	useEffect(reset, []);

	// reset values if size, array or algorithm are changed
	useEffect(() => {
		if (paused) reset();
	}, [size, newArray, algoType]);

	// Controls running state
	useEffect(() => {
		if (paused && running) setI(-100);
		else if (running)
			if (i === -1) setI(0);
			else setI((prev) => prev);
		else if (i > -1) {
			setPaused(true);
			setCords({ i, j });
		}
	}, [running]);

	// outer for loop
	useEffect(() => {
		if (i === -100) setI(cords.i);
		else if (running) {
			if (i >= length - 1) {
				dispatch({ type: "stop" });
				setI(-1);
				setJ(-1);
			} else if (paused) {
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
			if (j >= length - i - 1) {
				if (j === 1) setArrayState(j - 1, 2, true, false);
				else setArrayState(j, 2, false, false);

				setI((prev) => prev + 1);
			} else {
				setArrayState(j, 1);

				setTimeout(() => {
					if (array[j][0] > array[j + 1][0]) {
						setArrayState(j, -1);

						setTimeout(() => {
							swapAndSetArray(j);

							setTimeout(() => {
								setArrayState(j, 1);

								setTimeout(() => {
									setArrayState(j, 0, false, false);
									setJ((prev) => prev + 1);
								}, sortingSpeed);
							}, sortingSpeed);
						}, sortingSpeed);
					} else {
						setTimeout(() => {
							setArrayState(j, 0, false, false);

							setTimeout(() => {
								setJ((prev) => prev + 1);
							}, sortingSpeed);
						}, sortingSpeed);
					}
				}, sortingSpeed);
			}
	}, [j]);

	return <props.childComponent {...props.childProps} />;
}
