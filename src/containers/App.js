import React, { useReducer } from "react";
import "../styles/App.scss";

export const AppContext = React.createContext();

const initState = {
	newArray: true, // If true, then generate new Array
	algoType: "",
	arraySize: 10,
	speed: 10,
	runState: false, // If true, then run sorting
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
		case "state":
			return { ...state, runState: !state.runState };
		default:
			return state;
	}
};

export default function App() {
	const [state, dispatch] = useReducer(reducer, initState);

	return (
		<div className="App">
			<AppContext.Provider value={{ state, dispatch }}></AppContext.Provider>
		</div>
	);
}
