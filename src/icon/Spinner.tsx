import PropTypes from "prop-types";
import React from "react";
import {LoaderIcon} from "./LoaderIcon";

/**
 * Spinner is simple placeholder component - until truthy "done" is not true, spinner icon is shown.
 * When true, children prop is rendered.
 */
export const Spinner = (
	{
		done,
		children
	}) => {
	return (done ? children : <LoaderIcon spin/>);
};

Spinner.propTypes = {
	done: PropTypes.any,
	children: PropTypes.element,
};
