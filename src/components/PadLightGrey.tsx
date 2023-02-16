import React from "react";
import Pad from "./Pad";

import clsx from "clsx";

export default function PadLightGrey({ selected, className, ...props }) {
	return (
		<Pad className={clsx("text-black bg-gray-300", className)} {...props} />
	);
}
