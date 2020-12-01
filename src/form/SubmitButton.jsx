import {Button, Form} from "antd";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useFormContext} from "./FormContext";
import {FormUtils} from "./FormUtils";

/**
 * Button used to submit a form in any way. All fields must be valid to enable this button.
 *
 * Internally:
 *
 * - checks all fields if they're required and filled up
 * - checks for validation errors on fields
 *
 * Some interesting props:
 *
 * - **form** as antd Form instance (usually as Form.useForm())
 * - **title** of the button (goes through translation as is)
 * - other **props** goes to the underlying Antd Button
 *
 * Button props:
 *
 * - **icon** to define Button's icon
 * - **onClick** if you need to somehow handle button by hand
 *
 * Others:
 *
 * - https://ant.design/components/button/
 * - https://ant.design/components/form/#API
 */
const SubmitButton = ({form, title, ...props}) => {
	const {t} = useTranslation();
	const [disabled, setDisabled] = useState(true);
	const formContext = useFormContext();
	if (!form) {
		if (!formContext) {
			throw new Error("SubmitButton must be under FormContext (Form component) or get [form] prop!");
		}
		form = formContext.form;
	}
	useEffect(() => {
		/**
		 * Because we need to ensure all item forms are created, can submit works asynchronously.
		 */
		const promise = FormUtils.canSubmit(form).then(enabled => setDisabled(!enabled));
		return () => promise.cancel();
	}, []);
	return (
		<Form.Item shouldUpdate>
			{() => {
				// FormUtils.canSubmit(form).then(enabled => setDisabled(!enabled));
				return <Button
					type={"primary"}
					htmlType={"submit"}
					disabled={disabled}
					children={t(title)}
					{...props}
				/>;
			}}
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
	form: PropTypes.object,
	/**
	 * Optional icon.
	 */
	icon: PropTypes.node,
};

export default SubmitButton;
