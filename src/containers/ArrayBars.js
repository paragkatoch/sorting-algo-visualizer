import { useContext } from "react";
import {
	AppContext,
	getBarHeight,
	getBarMargin,
	getBarWidth,
	setHeightValue,
} from "../utils";
import Sort from "./Sort";

// FIXME - passing ArrayBarUI as children doesn't updates the UI
export default function ArrayBars({ gridSize }) {
	const { array, size } = useContext(AppContext);

	const props = {
		childProps: { array, gridSize, size },
		childComponent: ArrayBarsUI,
	};

	return <Sort {...props} />;
}

function ArrayBarsUI({ array, gridSize, size }) {
	return (
		<>
			{array.map((bar, i, bars) => {
				return (
					<div
						className="bar"
						key={i}
						id={`${bar} ${gridSize.clientHeight} ${size}`}
						style={{
							height: `${getBarHeight(bar, size, gridSize.clientHeight)}px`,
							width: `${getBarWidth(bars.length, gridSize.clientWidth)}px`,
							backgroundColor: "#1C62A3",
							margin: `${getBarMargin(bars.length, gridSize.clientWidth)}px`,
						}}
					>
						{setHeightValue(bar, bars.length, gridSize.clientWidth)}
					</div>
				);
			})}
		</>
	);
}
