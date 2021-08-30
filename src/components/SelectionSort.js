/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils";

export default function SelectionSort(props) {
	const [I, setI] = useState(-1);
	const [J, setJ] = useState(-1);
	const [paused, setPaused] = useState(false);
	const [cords, setCords] = useState({ I: -1, J: -1 });
	const [started, setStarted] = useState(false);
	const [, setUpdate] = useState(true);

	const { array, running, speed, dispatch } = useContext(AppContext);
	const length = array.length;

	useEffect(() => {
		if (!running && started) reset();
	}, [array]);

	useEffect(() => {
		if (running && !paused) {
			setStarted(true);
			setI(0);
		} else if (!running && started) {
			setPaused(true);
			setCords({ I, J });
		} else if (running && paused) {
			setI(-10);
		}
	}, [running]);

	// outer for loop
	useEffect(() => {
		if (running && I !== -1) {
			if (I === -10) setI(cords.I);
			else if (I < length - 1) {
				timeOut(() => {
					setArrayState([I], 1, false);

					paused ? setJ(-10) : setJ(I + 1);
				});
			} else {
				setArrayState([I], 2);
				dispatch({ type: "stop" });
				reset();
			}
		}
	}, [I]);

	// inner for loop
	useEffect(() => {
		if (running && J !== -1) {
			if (J === -10) {
				setPaused(false);
				setJ(cords.J);
			} else if (J < length) {
				timeOut(() => {
					setArrayState([J], 1);
					timeOut(() => {
						if (array[J][0] < array[I][0]) {
							setArrayState([I, J], -1);
							timeOut(() => {
								dispatch({ type: "array", data: swap(I, J) });
								setArrayState([I], 1);
								setArrayState([J], 0);

								timeOut(() => {
									setJ((prev) => prev + 1);
								});
							});
						} else {
							setArrayState([J], 0);
							setJ((prev) => prev + 1);
						}
					});
				});
			} else {
				timeOut(() => {
					setArrayState([I], 2);
					setI((prev) => prev + 1);
				});
			}
		}
	}, [J]);

	/**
	 * Helper functions
	 */

	/**
	 * set's default values
	 */
	function reset() {
		setI(-1);
		setJ(-1);
		setCords({ I: -1, J: -1 });
		setPaused(false);
		setStarted(false);
	}

	/**
	 * swap array values
	 * @param {number} index1 First index
	 * @param {number} index2 Second index
	 * @returns {array} updated array
	 */
	function swap(index1, index2) {
		let arr = array;
		let temp = arr[index1][0];
		arr[index1][0] = arr[index2][0];
		arr[index2][0] = temp;

		return arr;
	}

	/**
	 * run a function after specific time interval
	 * @param {function} func function to run
	 * @param {number} time timeInterval
	 */
	function timeOut(func, time = 4 * speed ** 2) {
		setTimeout(() => {
			if (running) {
				func();
			}
		}, time);
	}

	/**
	 *	set's the array state
	 *
	 * @param {number} from starting Index
	 * @param {boolean} to ending Index
	 * @param {number} state state value to set on the index
	 * @param {boolean} update should component re-render
	 */

	function setArrayState(indexes, state, update = true) {
		let arr = array;
		for (const index of indexes) {
			arr[index][1] = state;
		}
		setArray(arr, update);
	}

	/**
	 *	dispatches and re-render the component
	 *
	 * @param {array} array global state array
	 * @param {boolean} update should component re-render
	 */
	function setArray(array, update) {
		dispatch({ type: "array", data: array });
		if (update) setUpdate((prev) => !prev);
	}

	return <props.childComponent {...props.childProps} />;
}

/*

[88,38,58,33]


*/
