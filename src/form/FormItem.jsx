import {Form, Input} from "antd";
import PropTypes from "prop-types";
import React from "react";
import {useTranslation} from "react-i18next";
import {useFormContext} from "./FormContext";

const FormItem = (
	{
		name,
		required,
		children = _ => <Input/>,
		showLabel = true,
		noMargin = false,
		...props
	}) => {
	const {t} = useTranslation();
	if (noMargin) {
		props.style = {margin: 0};
	}
	const formContext = useFormContext();
	if (!formContext) {
		throw new Error("FormItem must be used with FormContext (for example Form component from leight-core package).");
	}
	// if (formContext.messages && formContext.messages.validations && formContext.messages.validations[name]) {
	// 	const message = formContext.messages.validations[name];
	// 	props.validateStatus = message.status;
	// 	props.help = message.message;
	// }
	return (
		<Form.Item
			name={name}
			label={showLabel === false ? null : t("form-item." + name + ".label")}
			rules={required ? [
				{
					required: true,
					message: t("form-item." + name + ".required"),
				}
			] : []}
			children={React.cloneElement(children(t("form-item." + name + ".label")), {required})}
			{...props}
		/>
	);
};

FormItem.propTypes = {
	/**
	 * Field name; also used for translations.
	 */
	name: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
	]).isRequired,
	/**
	 * Element being rendered as a form item value (Input, Datetime, ...).
	 */
	children: PropTypes.func,
	/**
	 * Attach required validation rule?
	 */
	required: PropTypes.bool,
	/**
	 * Show Antd Form.Item label.
	 */
	showLabel: PropTypes.bool,
	/**
	 * Disable default Antd Form.Item margin.
	 */
	noMargin: PropTypes.bool,
};

export default FormItem;
