import React, { useState } from "react";

import SideBar from "./SideBar";
import Header from "../components/Header";
import Grid from "../containers/Grid";

import { AppContext } from "../utils";
import "../styles/App.scss";

export default function App() {
	// states
	const [newArray, setNewArray] = useState(true);
	const [algoType, setAlgoType] = useState("");
	const [size, setSize] = useState(2); // 1-10
	const [speed, setSpeed] = useState(8); // 10 -1
	const [running, setRunning] = useState(false);
	const [array, setArray] = useState([]);

	const dispatch = ({ type, data }) => {
		console.log("dispatch - ", type, data);
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
			case "array":
				if (!running) setArray(data);
				break;
			default:
				console.log("What are you doing?");
		}
	};

	return (
		<div className="App">
			<AppContext.Provider
				value={{ newArray, size, speed, running, algoType, dispatch, array }}
			>
				<Header />
				<main className="Main">
					<Grid />
					<SideBar />
				</main>
			</AppContext.Provider>
		</div>
	);
}
