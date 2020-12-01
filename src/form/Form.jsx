import {Form as CoolForm} from "antd";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {createFormContext, FormContext} from "./FormContext";

/**
 * A bit more clever Form wrapper which provides also FormContext.
 *
 * Rest of props are sent to underlying Antd Form.
 */
export const Form = ({name, onFinish, onFinishFailed, children, ...props}) => {
	const [form] = CoolForm.useForm();
	const [errors, setErrors] = useState();
	useEffect(() => {
		form.setFields(((errors || {}).errors || []).map(item => {
			return {
				name: item.field,
				errors: [item.message],
			};
		}));
	}, [errors]);
	return (
		<FormContext.Provider value={createFormContext(
			form,
			errors,
			setErrors,
			values => form.setFieldsValue(values)
		)}>
			<CoolForm
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed || (() => null)}
				name={name}
				children={children}
				{...props}
			/>
		</FormContext.Provider>
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
