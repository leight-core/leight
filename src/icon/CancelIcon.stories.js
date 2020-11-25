import React from "react";
import CancelIcon from "./CancelIcon";

export default {
	title: "Leight/Icon/Cancel",
	component: CancelIcon,
	argTypes: {},
};

export const Cancel = () => <CancelIcon/>;

Cancel.parameters = {
	controls: {hideNoControlsWarning: true},
};
