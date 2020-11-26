import {Switch} from "antd";
import PropTypes from "prop-types";
import FormItem from "./FormItem";

/**
 * This one is just a tiny wrapper around common FormItem providing right binding to value props.
 *
 * Rest of props are sent to Antd Switch component.
 *
 * Others:
 *
 * - https://ant.design/components/switch/
 */
const SwitchFormItem = ({name, ...props}) => {
	return (
		<FormItem name={name} valuePropName={"checked"} children={_ => <Switch {...props}/>}/>
	);
};

SwitchFormItem.propTypes = {
	/**
	 * Field name:
	 *
	 * - https://ant.design/components/form/#NamePath
	 */
	name: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string),
	]).isRequired,
};

export default SwitchFormItem;
