import React, { useContext, useEffect, useState } from "react";

import BubbleSort from "../components/BubbleSort";
import HeapSort from "../components/HeapSort";
import InsertionSort from "../components/InsertionSort";
import MergeSort from "../components/MergeSort";
import QuickSort from "../components/QuickSort";
import SelectionSort from "../components/SelectionSort";

import { AppContext } from "../utils";

export default function Sort(props) {
	const { algoType } = useContext(AppContext);
	const [sorterType, setSorterType] = useState();

	useEffect(() => {
		if (sorterType !== algoType) {
			setSorterType(algoType);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [algoType]);

	switch (sorterType) {
		case "Merge":
			return <MergeSort {...props} />;
		case "Heap":
			return <HeapSort {...props} />;
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
}
