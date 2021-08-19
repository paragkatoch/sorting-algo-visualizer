import React, { useReducer } from "react";

import { AppContext } from "../utils";
import "../styles/App.scss";
import Header from "./Header";

export default function App() {
	const [state, dispatch] = useReducer(reducer, initState);

	return (
		<div className="App">
			<AppContext.Provider value={{ state, dispatch }}>
				<Header />
			</AppContext.Provider>
		</div>
	);
}

const initState = {
	newArray: true, // If true, then generate new Array
	algoType: "0",
	arraySize: 10,
	speed: 10,
	running: false, // If true, then run sorting
};

const reducer = (state, { type, data }) => {
	switch (type) {
		case "reset":
			return { ...state, newArray: true };
		case "algoType":
			return { ...state, algoType: data };
		case "arraySize":
			return { ...state, arraySize: data };
		case "speed":
			return { ...state, speed: data };
		case "start":
			return { ...state, running: true };
		case "stop":
			return { ...state, running: false };
		default:
			return state;
	}
};
