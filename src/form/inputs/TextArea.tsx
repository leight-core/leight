import {useOptionalFormItemContext} from "@leight-core/leight";
import {Input} from "antd";
import {TextAreaProps} from "antd/lib/input";
import {FC, forwardRef} from "react";

export interface ITextAreaProps extends Partial<TextAreaProps> {
	usePlaceholder?: boolean;
}

export const TextArea: FC<ITextAreaProps> = forwardRef(({usePlaceholder, ...props}, ref) => {
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	return <Input.TextArea ref={ref as any} {...props}/>;
});
