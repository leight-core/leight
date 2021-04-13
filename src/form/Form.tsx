import {Form as CoolForm, FormProps, Spin} from "antd";
import React, {FC, PropsWithChildren} from "react";
import {useFormContext} from "./FormContext";
import {FormContextProvider} from "./FormContextProvider";
import {IFormSubmitCallback, IFormSubmitFailedCallback} from "./interface";

interface IFormInternalProps {
	name?: string
	onSubmit: IFormSubmitCallback<any>
	onSubmitFailed: IFormSubmitFailedCallback<any>
}

const FormInternal: FC<IFormInternalProps> = ({name, onSubmit, onSubmitFailed, children, ...props}: IFormProps) => {
	const formContext = useFormContext();
	return (
		<CoolForm
			form={formContext.form}
			onFinish={values => onSubmit(values, formContext)}
			onFinishFailed={errors => onSubmitFailed!!(errors, formContext)}
			name={name}
			{...props}
			children={<Spin spinning={formContext.isBlocked()} children={children}/>}
		/>
	);
};

export interface IFormProps<TFormValues = any> extends Partial<FormProps<TFormValues>> {
	/**
	 * Form name.
	 */
	name?: string
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
		onSubmitFailed = () => null,
		children,
		...props
	}: PropsWithChildren<IFormProps<TFormValues>>) => {
	return (
		<FormContextProvider>
			<FormInternal onSubmitFailed={onSubmitFailed} children={children} {...props}/>
		</FormContextProvider>
	);
};
