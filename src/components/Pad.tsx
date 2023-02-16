import clsx from "clsx";
import React from "react";

export default function Pad({
	children,
	onClick,
	disabled,
	className,
	...props
}) {
	return (
		<button
			className={clsx(
				"text-4xl rounded-full grid place-content-center w-full h-full p-4",
				className
			)}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}
