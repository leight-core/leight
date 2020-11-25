import PropTypes from "prop-types";
import LoaderIcon from "./LoaderIcon";

/**
 * Spinner is simple placeholder component - until truthy "done" is not true, spinner icon is shown.
 * When true, children prop is rendered.
 */
const Spinner = (
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

export default Spinner;
