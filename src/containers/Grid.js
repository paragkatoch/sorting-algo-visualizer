import React, { useContext, useEffect, useRef, useState } from "react";

import ArrayBars from "../components/ArrayBars";

import "../styles/Grid.scss";
import { AppContext, arrayGen } from "../utils";

export default function Grid() {
	const [gridSize, setGridSize] = useState();
	const { newArray, size, dispatch } = useContext(AppContext);
	const gridRef = useRef();

	useEffect(() => {
		if (newArray) {
			dispatch({ type: "array", data: arrayGen(size) });
			dispatch({ type: "reset" });
		}
	}, [newArray, size, dispatch]);

	useEffect(() => {
		window.addEventListener("resize", setWidthHeight);
		setWidthHeight();

		return () => {
			window.removeEventListener("resize", setWidthHeight);
		};
	}, []);

	const setWidthHeight = () => {
		const { clientWidth, clientHeight } = gridRef.current;
		setGridSize({ clientWidth, clientHeight });
	};

	return (
		<div className="Grid">
			<div ref={gridRef} className="grid_container">
				<div className="ruler"></div>
				<div className="arrayBars">
					<ArrayBars {...{ gridSize }} />
				</div>
			</div>
		</div>
	);
}
