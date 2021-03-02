import {Form as CoolForm, FormProps, message, Spin} from "antd";
import React, {PropsWithChildren, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";
import {useLayoutContext} from "../layout/LayoutContext";
import {IGetCallback} from "../server/interface";
import {ServerEvents} from "../server/ServerEvents";
import {useViewContext} from "../view/ViewContext";
import {FormContext} from "./FormContext";
import {IFormContext, IFormErrors, IFormHandleFetchCallback, IFormSubmitCallback, IFormSubmitFailedCallback} from "./interface";

export interface IFormProps<TValues> extends Partial<FormProps<TValues>> {
	/**
	 * Form name.
	 */
	name: string
	/**
	 * What to to when a form is submitted (and validated).
	 */
	onSubmit: IFormSubmitCallback<TValues>
	/**
	 * Optional method to handle failed submit.
	 */
	onSubmitFailed?: IFormSubmitFailedCallback<TValues>
	/**
	 * Optional callback to fill-up the form (for example remote data).
	 */
	onFetch?: IGetCallback
	onHandleFetch?: IFormHandleFetchCallback<TValues>
}

/**
 * A bit more clever Form wrapper which provides also FormContext.
 *
 * Rest of props are sent to underlying Antd Form.
 */
export const Form = <TValues extends unknown = any>(
	{
		name,
		onSubmit,
		onSubmitFailed = () => null,
		onFetch,
		onHandleFetch = (formContext, data) => formContext.setValues(data),
		children = null,
		...props
	}: PropsWithChildren<IFormProps<TValues>>) => {
	const appContext = useAppContext();
	const layoutContext = useLayoutContext();
	const {blockContext} = useViewContext();
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
	useEffect(() => {
		const cancelToken = onFetch ? onFetch(
			appContext,
			ServerEvents()
				.on("request", () => {
					blockContext.block();
				})
				.on("success", data => {
					onHandleFetch(formContext, data);
					blockContext.unblock();
				})
		) : {cancel: () => undefined};
		return () => cancelToken.cancel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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
			>
				<Spin spinning={isBlocked()} children={children}/>
			</FormContext.Provider>
		</CoolForm>
	);
};
