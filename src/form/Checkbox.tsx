import {Checkbox as CoolCheckbox} from "antd";
import {CheckboxProps} from "antd/lib/checkbox/Checkbox";
import {NamePath} from "rc-field-form/lib/interface";
import React, {FC} from "react";
import {FormItem} from "./FormItem";

export interface ICheckbox extends Partial<CheckboxProps> {
	/**
	 * Field name:
	 *
	 * - https://ant.design/components/form/#NamePath
	 */
	field: NamePath
}

/**
 * This one is just a tiny wrapper around common FormItem providing right binding to value props.
 *
 * Rest of props are sent to Antd Switch component.
 *
 * Others:
 *
 * - https://ant.design/components/checkbox/
 */
export const Checkbox: FC<ICheckbox> = ({field, ...props}) => {
	return (
		<FormItem field={field} valuePropName={"checked"} children={_ => <CoolCheckbox {...props}/>}/>
	);
};
