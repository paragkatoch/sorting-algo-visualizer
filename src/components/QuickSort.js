import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils";

export default function QuickSort(props) {
	const { array, running, speed, dispatch } = useContext(AppContext);
	const length = array.length;

	const [, setUpdate] = useState(true);
	const [paused, setPaused] = useState(false);
	const [started, setStarted] = useState(false);
	const [cords, setCords] = useState({ I: -1, J: -1 });

	//quick
	const [quickSort, setQuickSort] = useState(false);
	const [pLength, setPLength] = useState();
	const [sort, setSort] = useState(false);
	const [partitionIndex, setPartitionIndex] = useState();
	const [minMax, setMinMax] = useState();
	const [zone, setZone] = useState(1);
	const [swapped, setSwapped] = useState(false);

	const [I, setI] = useState(-1);
	const [J, setJ] = useState(-1);

	useEffect(() => {
		if (running && !paused) {
			setPartitionIndex([[-1, 1]]);
			setMinMax([[0, length]]);
			setPLength(1);
			setStarted(true);
			setSort(true);
		} else if (!running && started) {
			setPaused(true);
			setSort(false);
		} else if (running && paused) {
			setPaused(false);
			if (zone === 0) {
				setQuickSort((prev) => !prev);
			} else if (zone === 1) {
				setSort(true);
			} else {
				setCords({ I, J });
				setJ(-10);
			}
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
					setZone(1);
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
				setZone(1);
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
				setZone(0);
				setQuickSort((prev) => !prev);
				setSort(false);
			} else {
				timeOut(() => {
					setArrayState([range[1] - 1], 1, true);

					timeOut(() => {
						setZone(2);
						setI(range[0] - 1);
						setJ(range[0]);
						setSort(false);
					});
				});
			}
		}
	}, [sort]);

	useEffect(() => {
		if (running && !paused && J !== -10) {
			let high = minMax[pLength - 1][1] - 1;
			if (J < high) {
				timeOut(() => {
					!swapped && setArrayState([I + 1, J], 1, true);

					timeOut(() => {
						console.log(
							array[J][0],
							array[high][0],
							array[J][0] < array[high][0],
							I,
							J
						);
						if (array[J][0] < array[high][0] || swapped) {
							if (I + 1 !== J && !swapped) setArrayState([I + 1, J], -1, true);

							timeOut(() => {
								!swapped && dispatch({ type: "array", data: swap(I + 1, J) });
								setSwapped(true);
								timeOut(() => {
									setArrayState([I + 1, J], 1, true);

									timeOut(() => {
										setSwapped(false);
										setArrayState([I + 1, J], 0);
										setI((prev) => prev + 1);
										setJ((prev) => prev + 1);
									});
								});
							}, swapped);
						} else {
							setArrayState([I + 1, J], 0);
							setJ((prev) => prev + 1);
						}
					});
				}, swapped);
			} else {
				setZone(0);
				setArrayState([high], 2);
				dispatch({ type: "array", data: swap(I + 1, high) });
				setQuickSort((prev) => !prev);
			}
		} else if (J === -10) {
			setJ(cords.J);
		}
	}, [J]);

	/**
	 * swap and update array values and
	 * re-renders the component
	 *
	 * @param {number} index index to be swapped
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
	function timeOut(func, now = false, time = 4 * speed ** 2) {
		if (now) {
			func();
		} else {
			const timeout = setTimeout(() => {
				if (running) {
					func();
				}
			}, time);
		}
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

/*
[87,38,67,32,66,25,49,81,70,28]

partitionIndex = [[-1,1]]
maxMin = [[0,length]]

max -min < 2 false
[87,38,67,32,66,25,49,81,70,28]

[25,28,67,32,66,87,49,81,70,38]

[25,28,67,32,66,87,49,81,70,38]
index = 1

partitionIndex = [[-1,1],[1,0]]
minMax = [[0,length],[0,1]]

max -min < 2 true  -> abort
index = null

partitionIndex = [[-1,1],[1,1]]
minMax = [[0,length],[2,length]]

max - min < 2 false
[67,32,66,87,49,81,70,38]

[32,38,66,87,49,81,70,67]

[25,28,32,38,66,87,49,81,70,67]
index = 3

partitionIndex = [[-1,1],[1,1],[3,0]]
minMax = [[0,length],[2,length],[2,3]]

max - min < 2 true -> abort
index = null

partitionIndex = [[-1,1],[1,1],[3,1]]
minMax = [[0,length],[2,length],[4,length]]

max - min < 2 false
[66,87,49,81,70,67]

[66,49,67,81,70,87]

[25,28,32,38,66,49,67,81,70,87]
index = 6

partitionIndex = [[-1,1],[1,1],[3,1],[6,0]]
minMax = [[0,length],[2,length],[4,length],[4,6]]

max - min < 2 false
[66,49]

[49,66]

[25,28,32,38,49,66,67,81,70,87]
index = null

partitionIndex = [[-1,1],[1,1],[3,1],[6,1]]
minMax = [[0,length],[2,length],[4,length],[7,length]]

[81,70,87]

[81,70,87]

[25,28,32,38,49,66,67,81,70,87]
index = 9

partitionIndex = [[-1,1],[1,1],[3,1],[6,1],[9,0]]
minMax = [[0,length],[2,length],[4,length],[7,length],[7,9]]

max - min < 2 false
[81,70]

[70,81]

[25,28,32,38,49,66,67,70,81,87]
index = null

partitionIndex = [[-1,1],[1,1],[3,1],[6,1],[9,1]]
minMax = [[0,length],[2,length],[4,length],[7,length],[10,length]]

max - min < 2 true -> abort
index = null

partitionIndex = []
minMax = []



*/
