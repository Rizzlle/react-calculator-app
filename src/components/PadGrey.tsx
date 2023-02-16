import React from "react";
import clsx from "clsx";
import Pad from "./Pad";

export default function PadGrey({ className, onClick, disabled, ...props }) {
	return (
		<Pad
			className={clsx("text-white bg-gray-700", className)}
			onClick={onClick}
			disabled={disabled}
			{...props}
		/>
	);
}
