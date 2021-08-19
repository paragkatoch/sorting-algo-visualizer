import React, { useState } from "react";

export default function Slider(props) {
	const [state, setState] = useState(props.value);

	function onInput(e) {
		setState(e.target.value);
	}

	return (
		<>
			<input type="range" min="1" max="100" value={state} onInput={onInput} />
		</>
	);
}
