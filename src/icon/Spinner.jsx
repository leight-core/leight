import PropTypes from "prop-types";
import LoaderIcon from "./LoaderIcon";

const Spinner = (
	{
		done,
		icon
	}) => {
	return (done ? icon : <LoaderIcon spin/>);
};

Spinner.propTypes = {
	done: PropTypes.any,
	icon: PropTypes.element.isRequired,
};

export default Spinner;
