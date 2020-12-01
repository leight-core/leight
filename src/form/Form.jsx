import {Form as CoolForm} from "antd";
import PropTypes from "prop-types";
import {useState} from "react";
import {createFormContext, FormContext} from "./FormContext";

/**
 * A bit more clever Form wrapper which provides also FormContext.
 *
 * Rest of props are sent to underlying Antd Form.
 */
export const Form = ({name, onFinish, onFinishFailed, children, ...props}) => {
	const [form] = Form.useForm();
	const [messages, setMessages] = useState();
	return (
		<FormContext.Provider value={createFormContext(
			form,
			messages,
			setMessages,
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
