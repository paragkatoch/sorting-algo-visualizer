import React, { useState } from "react";

const Slider = React.memo(({ name, value, handleSliderChange }) => {
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
				min="1"
				max="10"
				value={value}
				onInput={onInput}
			/>
		</>
	);
});

export default Slider;
