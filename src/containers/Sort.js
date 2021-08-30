import React, { useContext, useEffect, useState } from "react";

import BubbleSort from "../components/BubbleSort";
import InsertionSort from "../components/InsertionSort";
import MergeSort from "../components/MergeSort";
import QuickSort from "../components/QuickSort";
import SelectionSort from "../components/SelectionSort";

import { AppContext } from "../utils";

export default function Sort(props) {
	const { array, algoType, dispatch } = useContext(AppContext);
	const [sorterType, setSorterType] = useState();

	useEffect(() => {
		if (sorterType !== algoType) {
			resetArrayState();
			setSorterType(algoType);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [algoType]);

	switch (sorterType) {
		case "Merge":
			return <MergeSort {...props} />;
		case "Quick":
			return <QuickSort {...props} />;
		case "Bubble":
			return <BubbleSort {...props} />;
		case "Selection":
			return <SelectionSort {...props} />;
		case "Insertion":
			return <InsertionSort {...props} />;
		default:
			return <props.childComponent {...props.childProps} />;
	}
	function resetArrayState() {
		let arr = array;
		for (let i = 0; i < arr.length; i++) arr[i][1] = 0;
		dispatch({ type: "array", data: arr });
	}
}
