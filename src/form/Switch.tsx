import {Switch as CoolSwitch} from "antd";
import {SwitchProps} from "antd/lib/switch";
import {NamePath} from "rc-field-form/lib/interface";
import React, {FC} from "react";
import {FormItem} from "./FormItem";

export interface ISwitch extends Partial<SwitchProps> {
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
 * - https://ant.design/components/switch/
 */
export const Switch: FC<ISwitch> = ({field, ...props}) => {
	return (
		<FormItem field={field} valuePropName={"checked"} children={_ => <CoolSwitch checked {...props}/>}/>
	);
};
