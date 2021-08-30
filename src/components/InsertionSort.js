/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils";

export default function InsertionSort(props) {
	const [I, setI] = useState(-2);
	const [J, setJ] = useState(-2);

	const [key, setKey] = useState(null);
	const [paused, setPaused] = useState(false);
	const [cords, setCords] = useState({ I: -2, J: -2 });
	const [started, setStarted] = useState(false);
	const [, setUpdate] = useState(true);

	const { array, running, speed, dispatch } = useContext(AppContext);
	const length = array.length;

	useEffect(() => {
		if (!running) {
			reset();
		}
	}, [array]);

	useEffect(() => {
		if (running && !paused) {
			setStarted(true);
			setI(1);
		} else if (!running && started) {
			setCords({ I, J });
			setPaused(true);
		} else if (running && paused) {
			setI(-10);
		}
	}, [running]);

	useEffect(() => {
		if (running && I !== -2) {
			if (I === -10) {
				setI(cords.I);
			} else if (I < length) {
				timeOut(() => {
					if (!paused) {
						setKey(array[I]);
						setArrayState([I], 1);
						setJ(I - 1);
					} else {
						cords.J !== J && setCords({ I, J });
						setJ(-10);
					}
				});
			} else {
				setArrayStateRange(0, length);
				dispatch({ type: "stop" });
				reset();
			}
		}
	}, [I]);

	useEffect(() => {
		if (running && J !== -2) {
			timeOut(() => {
				if (J === -10) {
					setPaused(false);
					setJ(cords.J);
				} else if (J >= 0 && array[J][0] > key[0]) {
					setArrayState([J + 1], -1);
					timeOut(() => {
						pushBackAndSet(J);
						setJ((prev) => prev - 1);
					});
				} else {
					setI((prev) => prev + 1);
					setArrayState([J + 1], 0);
				}
			});
		}
	}, [J]);

	/**
	 * Helper functions
	 */

	/**
	 * set's default values
	 */
	function reset() {
		setI(-2);
		setJ(-2);
		setKey(null);
		setCords({ I: -2, J: -2 });
		setPaused(false);
		setStarted(false);
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
	 * switches element with key
	 * @param {number} j index of higher element
	 * @param {boolean} update re-render
	 */
	function pushBackAndSet(j, update = true) {
		let arr = array;
		arr[j + 1] = arr[j];
		arr[j] = key;
		setArray(arr, update);
	}

	/**
	 *	set's the array state
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
	 * set's the array state within range
	 * @param {number} start start index
	 * @param {number} end end index
	 */
	function setArrayStateRange(start, end) {
		let arr = array;
		for (let i = start; i < end; i++) {
			arr[i][1] = 2;
		}
		setArray(arr, false);
	}

	/**
	 *	dispatches and re-render the component
	 * @param {array} array global state array
	 * @param {boolean} update should component re-render
	 */
	function setArray(array, update) {
		dispatch({ type: "array", data: array });
		if (update) setUpdate((prev) => !prev);
	}

	return <props.childComponent {...props.childProps} />;
}
