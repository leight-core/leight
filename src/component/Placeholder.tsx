import {Skeleton} from "antd";
import React, {FC} from "react";

export interface IPlaceholder<TData> {
	display: (data: TData) => any
	data: TData
}

export function Placeholder<TData>(
	{
		display,
		data,
		children
	}): FC<IPlaceholder<TData>> {
	return data ? display(data) : (children || <Skeleton.Input size={"large"} style={{width: 200}} active={true}/>);
}
