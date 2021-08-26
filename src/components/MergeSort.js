/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils";

export default function MergeSort(props) {
	const { array, running, speed, dispatch } = useContext(AppContext);
	const length = array.length;

	const [, setUpdate] = useState(true);
	const [paused, setPaused] = useState(false);
	const [started, setStarted] = useState(false);
	const [cords, setCords] = useState(false);

	// Sort
	const [index, setIndex] = useState();
	const [maxIndex, setMaxIndex] = useState();
	const [sortIndexes, setSortIndexes] = useState();

	//merge
	const [merge, setMerge] = useState(false);
	const [continueMerge, setContinueMerge] = useState(false);
	const [startIndex, setStartIndex] = useState();
	const [I, setI] = useState(-1);
	const [J, setJ] = useState(-1);

	useEffect(() => {
		if (!running) reset();
	}, [array]);

	// controller
	useEffect(() => {
		if (running && !paused) {
			setStarted(true);
			setIndex(1);
			setMaxIndex(2);
		} else if (!running && started) {
			setMerge(false);
			setPaused(true);
		} else if (running && paused) {
			setMerge(false);
			setPaused(false);
		}
	}, [running]);

	// merge Sort
	useEffect(() => {
		if (running && !paused) {
			if (index === 0) {
				if (maxIndex === length) {
					reset();
					dispatch({ type: "stop" });
				} else {
					timeOut(() => {
						setMaxIndex((prev) => prev + 2);
						setIndex(2);
					});
				}
			} else {
				timeOut(() => {
					if (
						sortIndexes[index - 1] === sortIndexes[index] ||
						maxIndex === length
					) {
						setI(maxIndex - (sortIndexes[index] + sortIndexes[index - 1]));
						setJ(maxIndex - sortIndexes[index]);
						setMerge(true);
					} else {
						setMaxIndex((prev) => prev + 1);
						setIndex((prev) => prev + 1);
					}
				});
			}
		}
	}, [index, paused]);

	// merge
	useEffect(() => {
		if (merge) {
			if (cords) {
				setI(cords.I);
				setJ(cords.J);
				setCords(false);
			} else {
				setStartIndex(I);
				setArrayState(I, maxIndex, 1);
			}
			timeOut(() => {
				setContinueMerge((prev) => !prev);
			});
		}
	}, [merge]);

	// sort
	useEffect(() => {
		if (merge && running) {
			timeOut(() => {
				if (I < J && J < maxIndex) {
					if (array[I][0] <= array[J][0]) {
						setI((prev) => prev + 1);
						setContinueMerge((prev) => !prev);
					} else {
						if (array[I][1] !== -1) setArrayState(startIndex, maxIndex, -1);
						timeOut(() => {
							dispatch({ type: "array", data: shifter(I, J) });
							setJ((prev) => prev + 1);
							setI((prev) => prev + 1);
							setContinueMerge((prev) => !prev);
						});
					}
				} else if (I === J || J === maxIndex) {
					if (index === 1 && maxIndex === length) {
						setArrayState(0, maxIndex, 2);
						return setIndex((prev) => prev - 1);
					} else setArrayState(startIndex, maxIndex, 0);

					timeOut(() => {
						setSortIndexes(slicer());
						setMerge(false);
						setIndex((prev) => prev - 1);
					});
				}
			});
		} else if (I !== -1 && J !== -1 && paused) {
			setCords({ I, J });
		}
	}, [continueMerge]);

	/**
	 * Helper functions
	 */

	/**
	 * set's default values
	 */
	function reset() {
		setSortIndexes(new Array(array.length).fill(1));
		setI(-1);
		setJ(-1);
		setCords(false);
		setMerge(false);
		setStarted(false);
		setPaused(false);
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
			} else {
				setCords({ I, J });
			}
		}, time);
	}

	/**
	 * slice and increment array element
	 *
	 * @returns {array} array with sliced index
	 */
	function slicer() {
		let arr = sortIndexes;
		arr[index - 1] += arr[index];
		arr.splice(index, 1);
		return arr;
	}

	/**
	 *
	 * @param {number} I index of first element
	 * @param {number} J index of last element
	 * @returns {array} array with shifted element
	 */
	function shifter(I, J) {
		let arr = array;
		let temp = arr[J];
		for (let a = J; a > I; a--) {
			arr[a] = arr[a - 1];
		}
		arr[I] = temp;
		return arr;
	}

	/**
	 *	set's the array state
	 *
	 * @param {number} from starting Index
	 * @param {boolean} to ending Index
	 * @param {number} state state value to set on the index
	 * @param {boolean} update should component re-render
	 */
	function setArrayState(from, to, state, update = true) {
		let arr = array;
		for (let i = from; i < to; i++) {
			arr[i][1] = state;
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
