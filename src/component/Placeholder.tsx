import {Skeleton} from "antd";
import React from "react";

export const Placeholder = (
	{
		data,
		display,
		children
	}) => {
	return data ? display(data) : (children || <Skeleton.Input size={"large"} style={{width: 200}} active={true}/>);
};
