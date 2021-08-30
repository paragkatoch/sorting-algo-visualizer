/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils";

export default function QuickSort(props) {
	const { array, running, speed, dispatch } = useContext(AppContext);
	const length = array.length;

	const [, setUpdate] = useState(true);
	const [paused, setPaused] = useState(false);
	//quick
	const [quickSort, setQuickSort] = useState(false);
	const [pLength, setPLength] = useState();
	const [sort, setSort] = useState(false);
	const [partitionIndex, setPartitionIndex] = useState();
	const [minMax, setMinMax] = useState();

	const [I, setI] = useState(-1);
	const [J, setJ] = useState(-1);

	useEffect(() => {
		if (running && !paused) {
			setPartitionIndex([[-1, 1]]);
			setMinMax([[0, length]]);
			setPLength(1);
			setSort(true);
		}
	}, [running]);

	useEffect(() => {
		if (running) {
			let partition = partitionIndex;
			let range = minMax;
			let index = I + 1;

			if (index === -10) {
				if (partition[pLength - 1][1] === 0) {
					partition[pLength - 1][1] = 1;

					range.pop();
					range.push([partition[pLength - 1][0] + 1, range[pLength - 2][1]]);

					setPartitionIndex(partition);
					setMinMax(range);
					setSort(true);
				} else if (pLength === 1) {
					dispatch({ type: "stop" });
					return;
				} else {
					partition.pop();
					range.pop();

					setPartitionIndex(partition);
					setMinMax(range);
					setPLength((prev) => prev - 1);
					setQuickSort((prev) => !prev);
				}
			} else {
				if (partition[pLength - 1][1] === 0)
					range.push([range[pLength - 1][0], index]);
				else range.push([range[pLength - 1][0], index]);

				partition.push([index, 0]);

				setPartitionIndex(partition);
				setMinMax(range);
				setPLength((prev) => prev + 1);
				setSort(true);
			}
		}
	}, [quickSort]);

	useEffect(() => {
		if (sort) {
			const range = minMax[pLength - 1];
			if (range[1] - range[0] < 2) {
				range[0] < length && setArrayState([range[0]], 2);
				setI(-11);
				setQuickSort((prev) => !prev);
				setSort(false);
			} else {
				timeOut(() => {
					setArrayState([range[1] - 1], 1, true);

					timeOut(() => {
						setI(range[0] - 1);
						setJ(range[0]);
						setSort(false);
					});
				});
			}
		}
	}, [sort]);

	useEffect(() => {
		if (running && !paused) {
			let high = minMax[pLength - 1][1] - 1;
			if (J < high) {
				setArrayState([I + 1, J], 1, true);

				timeOut(() => {
					if (array[J][0] < array[high][0]) {
						if (I + 1 !== J) setArrayState([I + 1, J], -1, true);

						timeOut(() => {
							dispatch({ type: "array", data: swap(I + 1, J) });
							timeOut(() => {
								setArrayState([I + 1, J], 1, true);

								timeOut(() => {
									setArrayState([I + 1, J], 0);
									setI((prev) => prev + 1);
									setJ((prev) => prev + 1);
								});
							});
						});
					} else {
						setArrayState([I + 1, J], 0);
						setJ((prev) => prev + 1);
					}
				});
			} else {
				setArrayState([high], 2);
				dispatch({ type: "array", data: swap(I + 1, high) });
				setQuickSort((prev) => !prev);
			}
		}
	}, [J]);

	/**
	 * swap array values
	 * @param {number} index1 First index
	 * @param {number} index2 Second index
	 * @returns {array} updated array
	 */
	function swap(index1, index2) {
		let arr = array;
		let temp = arr[index1];
		arr[index1] = arr[index2];
		arr[index2] = temp;
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

	function setArrayState(indexes, state, update = false) {
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
