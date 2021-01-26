import {Skeleton} from "antd";
import {SkeletonInputProps} from "antd/lib/skeleton/Input";
import {ReactNode} from "react";

export interface IPlaceholderProps<TData = any> {
	/**
	 * Data being check; must be truthy to render placeholder's content.
	 */
	data?: TData
	/**
	 * Children takes data (when available) and should render it's content.
	 */
	children?: (data: TData) => JSX.Element
	/**
	 * Optional custom placeholder; defaults to Atnd Skeleton Input https://ant.design/components/skeleton/.
	 */
	placeholder?: () => ReactNode
	/**
	 * If needed, customize Antd Skeleton props.
	 */
	skeleton?: SkeletonInputProps
}

export const Placeholder = <TData extends unknown = any>(
	{
		data,
		children,
		skeleton,
		placeholder = () => <Skeleton.Input size={"large"} style={{width: 200}} active={true} {...skeleton}/>,
	}: IPlaceholderProps<TData>) => {
	return (
		<>
			{data ?
				(children && children(data as unknown as TData)) :
				placeholder()
			}
		</>
	);
};
