import {Skeleton, SkeletonProps} from "antd";
import {FC, ReactElement} from "react";

export interface IPlaceholderProps<TData = any> {
	/**
	 * Render children by this callback.
	 */
	callback: (data: TData) => ReactElement
	data: TData
	children?: ReactElement
	skeleton?: SkeletonProps
}

export const Placeholder: FC<IPlaceholderProps> = (
	{
		callback,
		data,
		children,
		skeleton,
	}) => {
	return (
		data ? callback(data) : (children || <Skeleton.Input size={"large"} style={{width: 200}} active={true} {...skeleton}/>)
	);
};
