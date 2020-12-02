import {Form as CoolForm} from "antd";
import {FormProps} from "antd/lib/form";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";
import React, {PropsWithChildren, useState} from "react";
import {FormContext, IFormErrors} from "./FormContext";
import {FormUtils} from "./FormUtils";

export interface IForm<TValues> extends Partial<FormProps<TValues>> {
	/**
	 * Form name.
	 */
	name: string
	/**
	 * What to to when a form is submitted (and validated).
	 */
	onFinish: (values: TValues) => void
	/**
	 * Optional method to handle failed submit.
	 */
	onFinishFailed?: (errorInfo: ValidateErrorEntity<TValues>) => void
}

/**
 * A bit more clever Form wrapper which provides also FormContext.
 *
 * Rest of props are sent to underlying Antd Form.
 */
export const Form = <TValues extends unknown = any>({name, onFinish, onFinishFailed = null, children = null, ...props}: PropsWithChildren<IForm<TValues>>) => {
	const [form] = CoolForm.useForm();
	const [errors, setErrors] = useState<IFormErrors>();
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
				value={{
					form,
					errors,
					setErrors: errors => {
						setErrors(errors);
						form.setFields(((errors || {}).errors || []).map(item => ({
							name: item.field,
							errors: [item.message],
						})));
					},
					setValues: values => form.setFieldsValue(values)
				}}
				children={children}
			/>
		</CoolForm>
	);
};
