import React, { useState } from "react";

const Slider = React.memo(
	({ name, value, handleSliderChange, min = 1, max = 10 }) => {
		console.log("Slider");
		function onInput(e) {
			const { className, value } = e.target;
			handleSliderChange(className, value);
		}

		return (
			<>
				<input
					className={name}
					type="range"
					min={min}
					max={max}
					value={value}
					onInput={onInput}
				/>
			</>
		);
	}
);

export default Slider;
