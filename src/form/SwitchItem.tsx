import {Switch as CoolSwitch} from "antd";
import {SwitchProps} from "antd/lib/switch";
import {NamePath} from "rc-field-form/lib/interface";
import React, {FC} from "react";
import {FormItem} from "./FormItem";

export interface ISwitchItem extends Partial<SwitchProps> {
	/**
	 * Field name:
	 *
	 * - https://ant.design/components/form/#NamePath
	 */
	field: NamePath
	labels?: string[]
}

/**
 * This one is just a tiny wrapper around common FormItem providing right binding to value props.
 *
 * Rest of props are sent to Antd SwitchItem component.
 *
 * Others:
 *
 * - https://ant.design/components/switch/
 */
export const SwitchItem: FC<ISwitchItem> = ({field, labels = [], ...props}) => {
	return (
		<FormItem
			field={field}
			valuePropName={"checked"}
			labels={labels}
			children={_ => <CoolSwitch checked {...props}/>}
		/>
	);
};
