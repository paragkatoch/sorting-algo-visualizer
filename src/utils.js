import React from "react";

export const AppContext = React.createContext();
export const inActiveButtonStyle = {
	boxShadow: "0 0 4px 0px #565656",
	filter: "none",
};

export const getBarHeight = (bar, size, height) =>
	(bar / (Math.ceil(size / 3) * 100)) * (height * 0.7);

export const getBarWidth = (length, width) => (width * 0.5) / length;

export const getBarMargin = (length, width) =>
	Math.min((width * 0.24) / length, 20);

export const setHeightValue = (bar, length, width) => {
	const barWidth = getBarWidth(length, width);
	let size = 20;
	if (barWidth > 25) {
		if (barWidth < 40) size = 12;
		else if (barWidth < 80) size = 16;
		return <p style={{ fontSize: `${size}px` }}>{bar}</p>;
	}
	return null;
};

export const getBackgroundColor = (state) => {
	switch (state) {
		case -1:
			return "#A31C1C"; // red
		case 1:
			return "#1CA321"; // green
		case 2:
			return "#1C21A3"; // dark-blue
		default:
			return "#1C62A3"; // light-blue
	}
};

/*
	Array size
	4*1 5*2 6*3 7*4 7*5	
	8*6 9*7 10*8 11*9 12*10
	
	array range
	(1,2,3) : 10 - 100
	(3,4,5) : 10 - 200
	(6,7,8) : 10 - 300
	(9,10)  : 10 - 400

	array state
	-1 - wrong
	0 - unsorted or untracked
	1 - selected 
	2 - sorted


	resulted array
	[[value,0],[value,0],[value,0],[value,0],[value,0]]
*/

export const arrayGen = (size) => {
	let array = [];
	let range = (size > 5 ? size + 2 : size + 3) * size;

	for (let i = 1; i <= range; i++) {
		array.push([
			Math.floor(10 + Math.random() * (Math.ceil(size / 3) * 100 - 10)),
			0,
		]);
	}
	return array;
};

export const Algorithm = {
	Selection: {
		pause: true,
	},
	Bubble: {
		pause: true,
	},
	Merge: {
		pause: true,
	},
	Quick: {
		pause: false,
	},
	Insertion: {
		pause: true,
	},
	Heap: {
		pause: true,
	},
};
