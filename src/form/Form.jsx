import {Form as CoolForm} from "antd";
import PropTypes from "prop-types";
import {useState} from "react";
import {createFormContext, FormContext} from "./FormContext";
import {FormUtils} from "./FormUtils";

/**
 * A bit more clever Form wrapper which provides also FormContext.
 *
 * Rest of props are sent to underlying Antd Form.
 */
export const Form = ({name, onFinish, onFinishFailed, children, ...props}) => {
	const [form] = CoolForm.useForm();
	const [errors, setErrors] = useState();
	return (
		<CoolForm
			form={form}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed || (() => null)}
			onValuesChange={value => FormUtils.resetError(form, value)}
			name={name}
			{...props}
		>
			<FormContext.Provider
				value={
					createFormContext(
						form,
						errors,
						errors => {
							setErrors(errors);
							form.setFields(((errors || {}).errors || []).map(item => ({
								name: item.field,
								errors: [item.message],
							})));
						},
						values => form.setFieldsValue(values)
					)}
				children={children}
			/>
		</CoolForm>

	);
};

Form.propTypes = {
	/**
	 * Form name.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * What to to when a form is submitted (and validated).
	 */
	onFinish: PropTypes.func.isRequired,
	/**
	 * Optional method to handle failed submit.
	 */
	onFinishFailed: PropTypes.func,
};
