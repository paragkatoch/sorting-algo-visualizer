import { useContext } from "react";

import Slider from "../components/Slider";

import { AppContext } from "../utils";

export default function Sliders() {
	const { size, speed } = useContext(AppContext);
	const types = [
		{ name: "size", title: "Array size", value: size },
		{
			name: "speed",
			title: "Sorting speed",
			value: -1 * speed,
			min: -10,
			max: -1,
		},
	];

	return (
		<>
			{types.map((type) => {
				const { title, ...rest } = type;
				return (
					<section key={rest.name} className={`slider_${rest.name}`}>
						<p>{title}</p>
						<Slider {...rest} />
					</section>
				);
			})}
		</>
	);
}
