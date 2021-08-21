import React, { useState } from "react";

import { AppContext } from "../utils";
import "../styles/App.scss";
import Header from "./Header";
import Main from "./Main";

export default function App() {
	console.log("App");
	const [newArray, setNewArray] = useState(true);
	const [algoType, setAlgoType] = useState("");
	const [size, setSize] = useState(4);
	const [speed, setSpeed] = useState(4);
	const [running, setRunning] = useState(false);

	const dispatch = ({ type, data }) => {
		console.log("dispatch", type, data);
		switch (type) {
			case "reset":
				if (!running) setNewArray((prev) => !prev);
				break;
			case "algoType":
				if (!running) setAlgoType(data);
				break;
			case "size":
				if (!running) {
					setNewArray(true);
					setSize(data);
				}
				break;
			case "speed":
				if (!running) setSpeed(data);
				break;
			case "start":
				if (algoType !== "") setRunning(true);
				break;
			case "stop":
				if (algoType !== "") setRunning(false);
				break;
			default:
				console.log("What are you doing?");
		}
		console.log({ newArray, size, speed, running, algoType });
	};
	// const [state, dispatch] = useReducer(reducer, initState);

	// useEffect(() => {

	// }, [newArray, size, speed, running, algoType]);
	return (
		<div className="App">
			<AppContext.Provider
				value={{ newArray, size, speed, running, algoType, dispatch }}
			>
				<Header />
				<Main />
			</AppContext.Provider>
		</div>
	);
}

// const initState = {
// 	newArray: true, // If true, then generate new Array
// 	algoType: "",
// 	size: 4,
// 	speed: 4,
// 	running: false, // If true, then run sorting
// };

// const reducer = (state, { type, data }) => {
// 	switch (type) {
// 		case "reset":
// 			if (!state.running) return { ...state, newArray: !state.newArray };
// 			break;
// 		case "algoType":
// 			if (!state.running) return { ...state, algoType: data };
// 			break;
// 		case "size":
// 			if (!state.running) return { ...state, size: data, newArray: true };
// 			break;
// 		case "speed":
// 			if (!state.running) return { ...state, speed: data };
// 			break;
// 		case "start":
// 			if (state.algoType !== "") return { ...state, running: true };
// 			break;
// 		case "stop":
// 			if (state.algoType !== "") return { ...state, running: false };
// 			break;
// 		default:
// 			return state;
// 	}
// 	return state;
// };
