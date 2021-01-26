import {Skeleton, SkeletonProps} from "antd";
import {ReactElement} from "react";

export interface IPlaceholderProps<TData = any> {
	/**
	 * Data being check; must be truthy to render placeholder's content.
	 */
	data?: TData
	/**
	 * Children takes data (when available) and should render it's content.
	 */
	children?: (data: TData) => ReactElement
	/**
	 * Optional custom placeholder; defaults to Atnd Skeleon Input https://ant.design/components/skeleton/.
	 */
	placeholder?: ReactElement
	/**
	 * If needed, customize Antd Skeleton props.
	 */
	skeleton?: SkeletonProps
}

export const Placeholder = <TData extends unknown = any>(
	{
		data,
		children,
		placeholder,
		skeleton,
	}: IPlaceholderProps<TData>) => {
	return (
		<>
			{data ?
				(children && children(data as unknown as TData)) :
				(placeholder || <Skeleton.Input size={"large"} style={{width: 200}} active={true} {...skeleton}/>)
			}
		</>
	);
};
