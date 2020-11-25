import {
	Button,
	Form
} from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import isButtonEnabled from "./isButtonEnabled";

/**
 * Button used to submit a form in any way. All fields must be valid to enable this button.
 *
 * @returns {JSX.Element}
 * @constructor
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
					children={t(props.title) + "dfsdf"}
					{...props}
				/>
			)}
		</Form.Item>
	);
};

SubmitButton.propTypes = {
	title: PropTypes.string.isRequired,
	form:  PropTypes.object.isRequired,
};

export default SubmitButton;
