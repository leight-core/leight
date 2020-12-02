import {Button, Form} from "antd";
import {ButtonProps} from "antd/lib/button";
import {FormInstance} from "antd/lib/form";
import React, {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useFormContext} from "./FormContext";
import {FormUtils} from "./FormUtils";

export interface ISubmitButton extends Partial<ButtonProps> {
	/**
	 * An Antd Form Instance used for validation checks and others.
	 */
	formInstance?: FormInstance
	/**
	 * Title on the button; goes through react-i18next.
	 */
	title: string
}

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
export const SubmitButton: FC<ISubmitButton> = ({formInstance, title, ...props}) => {
	const [disabled, setDisabled] = useState(true);
	const formContext = useFormContext();
	if (!formInstance) {
		if (!formContext) {
			throw new Error("SubmitButton must be under FormContext (Form component) or get [form] prop!");
		}
		formInstance = formContext.form;
	}

	const Internal = () => {
		const {t} = useTranslation();
		useEffect(() => {
			/**
			 * Because we need to ensure all item forms are created, can submit works asynchronously.
			 */
			const promise = FormUtils.canSubmit(formInstance).then(enabled => setDisabled(!enabled));
			return () => promise.cancel();
		});
		return <Button
			type={"primary"}
			htmlType={"submit"}
			disabled={disabled}
			children={t(title)}
			{...props}
		/>;
	};

	return (
		<Form.Item shouldUpdate>
			{() => <Internal/>}
		</Form.Item>
	);
};
