import {Button, Form} from "antd";
import {ButtonProps} from "antd/lib/button";
import {FormInstance} from "antd/lib/form";
import React, {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Spinner} from "../icon/Spinner";
import {SubmitDisabledIcon} from "../icon/SubmitDisabledIcon";
import {useFormContext} from "./FormContext";
import {FormUtils} from "./FormUtils";

export interface ISubmitButton extends Partial<ButtonProps> {
	/**
	 * Disable Form.Item styling.
	 */
	noStyle?: boolean
	/**
	 * An Antd Form Instance used for validation checks and others.
	 */
	formInstance?: FormInstance
	/**
	 * Title on the button; goes through react-i18next.
	 */
	title: string
	disabledIcon?: boolean | JSX.Element
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
export const SubmitButton: FC<ISubmitButton> = ({formInstance, noStyle, title, icon, disabledIcon, ...props}) => {
	const [disabled, setDisabled] = useState(true);
	const formContext = useFormContext();
	if (!formContext) {
		throw new Error("SubmitButton must be under FormContext (Form component) or get [form] prop!");
	}

	const Internal = () => {
		const {t} = useTranslation();
		useEffect(() => {
			/**
			 * Because we need to ensure all item forms are created, can submit works asynchronously.
			 */
			const promise = FormUtils.canSubmit(formContext.form).then(enabled => setDisabled(!enabled));
			return () => promise.cancel();
		});
		return <Button
			type={"primary"}
			disabled={disabled}
			children={t(title)}
			icon={<Spinner done={!formContext.isBlocked()} children={disabled ? (disabledIcon || <SubmitDisabledIcon/>) : icon}/>}
			{...props}
		/>;
	};

	return (
		<Form.Item shouldUpdate noStyle={noStyle}>
			{() => <Internal/>}
		</Form.Item>
	);
};
