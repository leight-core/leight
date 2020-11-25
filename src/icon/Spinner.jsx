import PropTypes from "prop-types";
import LoaderIcon from "./LoaderIcon";

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
