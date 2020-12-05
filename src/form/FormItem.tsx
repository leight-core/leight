import {Form, Input} from "antd";
import {FormItemProps} from "antd/lib/form";
import {NamePath} from "rc-field-form/lib/interface";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {useFormContext} from "./FormContext";

export interface IFormItem extends Partial<FormItemProps> {
	/**
	 * Field name; also used for translations.
	 */
	field: NamePath
	/**
	 * Attach required validation rule?
	 */
	required?: boolean
	/**
	 * Show Antd Form.Item label.
	 */
	showLabel?: boolean
	/**
	 * Disable default Antd Form.Item margin.
	 */
	noMargin?: boolean
	children?: (label: string) => JSX.Element
	labels?: string[]
}

export const FormItem: FC<IFormItem> = (
	{
		field,
		required = false,
		showLabel = true,
		noMargin = false,
		children = _ => <Input/>,
		labels = [],
		...props
	}) => {
	const {t} = useTranslation();
	if (noMargin) {
		props.style = {margin: 0};
	}
	const formContext = useFormContext();
	if (!formContext) {
		throw new Error("FormItem must be used with FormContext (for example Form component from leight-core package).");
	}
	const fieldName = Array.isArray(field) ? field.join(".") : field;
	return (
		<Form.Item
			name={field}
			label={showLabel === false ? null : t(["form-item." + fieldName + ".label"].concat(labels))}
			rules={required ? [
				{
					required: true,
					message: t(["form-item." + fieldName + ".required"].concat(labels.map(item => item + ".required"))),
				}
			] : []}
			children={React.cloneElement(children(t(["form-item." + fieldName + ".label"].concat(labels))), {["data-required"]: required})}
			{...props}
		/>
	);
};
