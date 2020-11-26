import {Form} from "antd";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

const FormItem = ({name, required = true, children}) => {
	const {t} = useTranslation();
	return (
		<Form.Item
			name={name}
			rules={required ? [
				{
					required: true,
					message: t("form-item." + name + ".required"),
				}
			] : []}
			children={children(t("form-item." + name + ".label"))}
		/>
	);
};

FormItem.propTypes = {
	/**
	 * Field name; also used for translations.
	 */
	name: PropTypes.oneOfType(
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string)
	).isRequired,
	/**
	 * Element being rendered as a form item value (Input, Datetime, ...)
	 */
	children: PropTypes.func.isRequired,
	/**
	 * Attach required validation rule?
	 */
	required: PropTypes.bool,
};

export default FormItem;
