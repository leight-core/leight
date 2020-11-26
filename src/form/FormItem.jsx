import {
	Form,
	Input
} from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const FormItem = (
	{
		name,
		required,
		children = _ => <Input/>,
		showLabel = true,
		...props
	}) => {
	const {t} = useTranslation();
	return (
		<Form.Item
			name={name}
			label={showLabel === false ? null : t("form-item." + name + ".label")}
			rules={required ? [
				{
					required: true,
					message:  t("form-item." + name + ".required"),
				}
			] : []}
			children={children(t("form-item." + name + ".label"))}
			style={{margin: 0}}
			{...props}
		/>
	);
};

FormItem.propTypes = {
	/**
	 * Field name; also used for translations.
	 */
	name:      PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string)
	]).isRequired,
	/**
	 * Element being rendered as a form item value (Input, Datetime, ...)
	 */
	children:  PropTypes.func,
	/**
	 * Attach required validation rule?
	 */
	required:  PropTypes.bool,
	showLabel: PropTypes.bool,
};

export default FormItem;
