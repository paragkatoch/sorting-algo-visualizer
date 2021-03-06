import React, { useContext } from "react";
import { AppContext } from "../utils";

const Slider = React.memo(({ name, value, min = 1, max = 10 }) => {
	const { dispatch } = useContext(AppContext);

	const onInput = (e) => {
		const { className, value } = e.target;
		const data = Math.abs(Number(value));
		dispatch({ type: className, data });
	};

	return (
		<>
			<input
				style={{ cursor: "pointer" }}
				className={name}
				type="range"
				min={min}
				max={max}
				value={value}
				onInput={onInput}
			/>
		</>
	);
});

export default Slider;
