import {Skeleton} from "antd";
import {FC} from "react";

export interface IPlaceholderProps<TData> {
	display: (data: TData) => any
	data: TData
}

export function Placeholder<TData>(
	{
		display,
		data,
		children
	}): FC<IPlaceholderProps<TData>> {
	return data ? display(data) : (children || <Skeleton.Input size={"large"} style={{width: 200}} active={true}/>);
}
