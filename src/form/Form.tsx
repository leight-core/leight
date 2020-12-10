import {Form as CoolForm, message} from "antd";
import {FormProps} from "antd/lib/form";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";
import React, {PropsWithChildren, useState} from "react";
import {useTranslation} from "react-i18next";
import {FormContext} from "./FormContext";
import {IFormContext, IFormErrors} from "./interface";

export interface IFormProps<TValues> extends Partial<FormProps<TValues>> {
	/**
	 * Form name.
	 */
	name: string
	/**
	 * What to to when a form is submitted (and validated).
	 */
	onSubmit: (values: TValues, formContext: IFormContext) => void
	/**
	 * Optional method to handle failed submit.
	 */
	onSubmitFailed?: (errorInfo: ValidateErrorEntity<TValues>, formContext: IFormContext) => void
}

/**
 * A bit more clever Form wrapper which provides also FormContext.
 *
 * Rest of props are sent to underlying Antd Form.
 */
export const Form = <TValues extends unknown = any>({name, onSubmit, onSubmitFailed = () => null, children = null, ...props}: PropsWithChildren<IFormProps<TValues>>) => {
	const [form] = CoolForm.useForm();
	const {t} = useTranslation();
	const [errors, setErrors] = useState<IFormErrors>();
	const [blocking, setBlocking] = useState<number>(0);
	const isBlocked = () => blocking > 0;
	const formContext = {
		form,
		errors: errors as IFormErrors,
		setErrors: errors => {
			setErrors(errors);
			errors.message && message.error(t("error." + errors.message));
			form.setFields(((errors || {}).errors || []).map(item => ({
				name: item.id,
				errors: [item.error],
			})));
		},
		setValues: values => form.setFieldsValue(values),
		reset: () => form.resetFields(),
		blocking,
		isBlocked,
		block: () => setBlocking(prev => prev + 1),
		unblock: () => setBlocking(prev => prev - 1),
	};
	return (
		<CoolForm
			form={form}
			onFinish={values => onSubmit(values, formContext)}
			onFinishFailed={errors => onSubmitFailed(errors, formContext)}
			name={name}
			{...props}
		>
			<FormContext.Provider
				value={formContext}
				children={children}
			/>
		</CoolForm>
	);
};
