/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils";

export default function BubbleSort(props) {
	const [I, setI] = useState(-1);
	const [J, setJ] = useState(-1);
	const [paused, setPaused] = useState(false);
	const [cords, setCords] = useState({ I: -1, J: -1 });
	const [, setUpdate] = useState(true);

	const { array, running, speed, dispatch } = useContext(AppContext);
	const length = array.length;

	/**
	 * 		Logic
	 */

	// reset values if size, array or algorithm are changed
	useEffect(() => {
		if (paused) reset();
	}, [array]);

	// Controls running state
	useEffect(() => {
		if (paused && running) setI(-100);
		else if (running)
			if (I === -1) setI(0);
			else setI((prev) => prev);
		else if (I > -1) {
			setPaused(true);
			const j = J > -1 ? J : 0;
			setCords({ I, J: j });
		}
	}, [running]);

	// outer for loop
	useEffect(() => {
		if (I === -100) setI(cords.I);
		else if (running) {
			if (I >= length - 1) {
				dispatch({ type: "stop" });
				setI(-1);
				setJ(-1);
			} else if (paused) {
				timeOut(() => {
					setJ(-100);
					setPaused(false);
				});
			} else {
				timeOut(() => {
					setJ(0);
				});
			}
		}
	}, [I]);

	// inner for loop
	useEffect(() => {
		if (J === -100) setJ(cords.J);
		else if (running && I >= 0)
			if (J >= length - I - 1) {
				if (J === 1) setArrayState(J - 1, 2, true, false);
				else setArrayState(J, 2, false, false);

				setI((prev) => prev + 1);
			} else {
				setArrayState(J, 1);

				timeOut(() => {
					if (array[J][0] > array[J + 1][0]) {
						setArrayState(J, -1);

						timeOut(() => {
							swapAndSetArray(J);

							timeOut(() => {
								setArrayState(J, 1);

								timeOut(() => {
									setArrayState(J, 0, false, false);
									setJ((prev) => prev + 1);
								});
							});
						});
					} else {
						setArrayState(J, 0, false, false);

						timeOut(() => {
							setJ((prev) => prev + 1);
						});
					}
				});
			}
	}, [J]);

	/**
	 * 		Helper functions
	 */

	/**
	 * set's default values
	 */
	function reset() {
		setI(-1);
		setJ(-1);
		setPaused(false);
		setCords({ I: -1, J: -1 });
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

	return <props.childComponent {...props.childProps} />;
}
