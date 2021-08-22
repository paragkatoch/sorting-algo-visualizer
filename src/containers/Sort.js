import React, { useContext, useEffect, useState } from "react";

import BubbleSort from "../components/BubbleSort";
import HeapSort from "../components/HeapSort";
import MergeSort from "../components/MergeSort";
import QuickSort from "../components/QuickSort";

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
		case "Merge Sort":
			return <MergeSort {...props} />;
		case "Heap Sort":
			return <HeapSort {...props} />;
		case "Quick Sort":
			return <QuickSort {...props} />;
		case "Bubble Sort":
			return <BubbleSort {...props} />;
		default:
			return <props.childComponent {...props.childProps} />;
	}
}
