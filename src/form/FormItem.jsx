import {Form, Input} from "antd";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

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
			children={children(t("form-item." + name + ".label"))}
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
		PropTypes.arrayOf(PropTypes.string)
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
