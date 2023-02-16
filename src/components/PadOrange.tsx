import React from "react";
import Pad from "./Pad";

import clsx from "clsx";

export default function PadOrange({ selected, className, onClick, ...props }) {
	return (
		<Pad
			className={clsx(
				selected
					? ["bg-white text-orange-500"]
					: ["bg-orange-500 text-white"],
				className
			)}
			onClick={onClick}
			{...props}
		/>
	);
}
