import {Switch as CoolSwitch} from "antd";
import PropTypes from "prop-types";
import React from "react";
import {FormItem} from "./FormItem";

/**
 * This one is just a tiny wrapper around common FormItem providing right binding to value props.
 *
 * Rest of props are sent to Antd Switch component.
 *
 * Others:
 *
 * - https://ant.design/components/switch/
 */
export const Switch = ({name, ...props}) => {
	return (
		<FormItem name={name} valuePropName={"checked"} children={_ => <CoolSwitch checked {...props}/>}/>
	);
};

Switch.propTypes = {
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
