import {Form as CoolForm, FormProps, message, Spin} from "antd";
import React, {PropsWithChildren, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLayoutContext} from "../layout/LayoutContext";
import {ServerEvents} from "../server/ServerEvents";
import {FormContext} from "./FormContext";
import {IFormContext, IFormErrors, IFormSubmitCallback, IFormSubmitFailedCallback} from "./interface";

export interface IFormProps<TFormValues> extends Partial<FormProps<TFormValues>> {
	/**
	 * Form name.
	 */
	name: string
	/**
	 * What to to when a form is submitted (and validated).
	 */
	onSubmit: IFormSubmitCallback<TFormValues>
	/**
	 * Optional method to handle failed submit.
	 */
	onSubmitFailed?: IFormSubmitFailedCallback<TFormValues>
}

/**
 * A bit more clever Form wrapper which provides also FormContext.
 *
 * Rest of props are sent to underlying Antd Form.
 */
export const Form = <TFormValues extends unknown = any>(
	{
		name,
		onSubmit,
		onSubmitFailed = () => null,
		children = null,
		...props
	}: PropsWithChildren<IFormProps<TFormValues>>) => {
	const layoutContext = useLayoutContext();
	const [form] = CoolForm.useForm();
	const {t} = useTranslation();
	const [errors, setErrors] = useState<IFormErrors>();
	const [blocking, setBlocking] = useState<number>(0);
	const isBlocked = () => blocking > 0;
	const formContext: IFormContext = {
		form,
		errors: errors as IFormErrors,
		setErrors: (errors: IFormErrors) => {
			setErrors(errors);
			errors.message && message.error(t("error." + errors.message));
			form.setFields(((errors || {}).errors || []).map(item => ({
				name: item.id,
				errors: [t("error." + item.error)],
			})));
		},
		setValues: values => form.setFieldsValue(values),
		reset: () => form.resetFields(),
		blocking,
		isBlocked,
		block: () => setBlocking(prev => prev + 1),
		unblock: () => setBlocking(prev => prev - 1),
		events: () => ServerEvents()
			.on("request", () => {
				layoutContext.blockContext.block();
			})
			.on("http400", errors => formContext.setErrors(errors))
			.on("http500", () => formContext.setErrors({
				message: t("common.form.server-error"),
				errors: [],
			}))
			.on("catch", () => {
				layoutContext.blockContext.unblock(true);
			})
			.on("done", () => {
				layoutContext.blockContext.unblock();
			})
	};
	return (
		<CoolForm
			form={form}
			onFinish={values => onSubmit(values, formContext)}
			onFinishFailed={errors => onSubmitFailed(errors, formContext)}
			name={name}
			{...props}
		>
			<FormContext.Provider value={formContext}>
				<Spin spinning={isBlocked()} children={children}/>
			</FormContext.Provider>
		</CoolForm>
	);
};
