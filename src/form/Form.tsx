import {Form as CoolForm, message} from "antd";
import {FormProps} from "antd/lib/form";
import {ValidateErrorEntity} from "rc-field-form/lib/interface";
import React, {PropsWithChildren, useState} from "react";
import {useTranslation} from "react-i18next";
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
export const Form = <TValues extends unknown = any>({name, onFinish, onFinishFailed = () => null, children = null, ...props}: PropsWithChildren<IForm<TValues>>) => {
	const [form] = CoolForm.useForm();
	const {t} = useTranslation();
	const [errors, setErrors] = useState<IFormErrors>();
	const [loading, setLoading] = useState<number>(0);
	const isLoading = () => loading > 0;
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
					errors: errors as IFormErrors,
					setErrors: errors => {
						setErrors(errors);
						errors.message && message.error(t("error." + errors.message));
						form.setFields(((errors || {}).errors || []).map(item => ({
							name: item.id,
							errors: [item.message],
						})));
					},
					setValues: values => form.setFieldsValue(values),
					loading,
					isLoading,
					loadingStart: () => setLoading(prev => prev + 1),
					loadingFinish: () => setLoading(prev => prev - 1),
				}}
				children={children}
			/>
		</CoolForm>
	);
};
