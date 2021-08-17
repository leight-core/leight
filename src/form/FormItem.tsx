import {FormItemContext, useFormContext, useOptionalItemGroupContext} from "@leight-core/leight";
import {Form, FormItemProps, Input} from "antd";
import {NamePath, Rule} from "rc-field-form/lib/interface";
import {cloneElement, FC} from "react";
import {useTranslation} from "react-i18next";

export interface IFormItemProps extends Partial<FormItemProps> {
	/**
	 * Field name; also used for translations.
	 */
	field: NamePath;
	/**
	 * Attach required validation rule?
	 */
	required?: boolean;
	/**
	 * Show Antd Form.Item label.
	 */
	showLabel?: boolean;
	/**
	 * Disable default Antd Form.Item margin.
	 */
	noMargin?: boolean;
	labels?: string[];
}

export const FormItem: FC<IFormItemProps> = (
	{
		field,
		required = false,
		showLabel = true,
		noMargin = false,
		children = <Input/>,
		labels = [],
		...props
	}) => {
	const {t} = useTranslation();
	if (noMargin) {
		props.style = {margin: 0};
	}
	const formContext = useFormContext();
	const itemGroupContext = useOptionalItemGroupContext();
	field = ([] as (string | number)[]).concat(itemGroupContext ? itemGroupContext.prefix : [], Array.isArray(field) ? field : [field]);
	const fieldName = Array.isArray(field) ? field.join(".") : field;
	const rules: Rule[] = [];
	if (required) {
		rules.push({
			required: true,
			message: t(["form-item." + fieldName + ".required"].concat(labels.map(item => item + ".required"))) as string,
		});
	}
	/**
	 * This is... a hack I really don't understand! But it works.
	 *
	 * The idea is to clear errors set from form context and this solution could do that with ease!
	 */
	rules.push(() => ({validator: () => Promise.resolve()}));
	return (
		<FormItemContext.Provider
			value={{
				field,
				label: t(["form-item." + fieldName + ".label"].concat(labels)) as string,
				getValue: () => formContext.form.getFieldValue(field),
				setValue: value => formContext.form.setFields([{name: field, value}])
			}}
		>
			<Form.Item
				name={field}
				label={showLabel === false ? null : t(["form-item." + fieldName + ".label"].concat(labels))}
				rules={rules}
				{...props}
				children={children ? cloneElement(children as any, {["data-required"]: required}) : null}
			/>
		</FormItemContext.Provider>
	);
};
