import {Button, Form} from "antd";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import isButtonEnabled from "./isButtonEnabled";

/**
 * Button used to submit a form in any way. All fields must be valid to enable this button.
 *
 * Internally:
 * - checks if all form fields are touched
 * - checks for validation errors on fields
 */
const SubmitButton = (props) => {
	const {t} = useTranslation();
	return (
		<Form.Item shouldUpdate>
			{() => (
				<Button
					type={"primary"}
					htmlType={"submit"}
					disabled={!isButtonEnabled(props.form)}
					children={t(props.title)}
					{...props}
				/>
			)}
		</Form.Item>
	);
};

SubmitButton.propTypes = {
	/**
	 * Title on the button; goes through react-i18next.
	 */
	title: PropTypes.string.isRequired,
	/**
	 * An Antd Form Instance used for validation checks and others.
	 */
	form: PropTypes.object.isRequired,
	/**
	 * Optional icon.
	 */
	icon: PropTypes.node,
};

export default SubmitButton;
