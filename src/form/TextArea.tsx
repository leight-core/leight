import {Input} from "antd";
import {TextAreaProps} from "antd/lib/input";
import {FC} from "react";
import {useOptionalFormItemContext} from "./FormItemContext";

export interface ITextAreaProps extends Partial<TextAreaProps> {
	usePlaceholder?: boolean
}

export const TextArea: FC<ITextAreaProps> = ({usePlaceholder, ...props}) => {
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	return (
		<Input.TextArea
			{...props}
		/>
	);
};
