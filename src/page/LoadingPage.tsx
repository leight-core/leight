import {EmptyPage, IEmptyPageProps, LoaderIcon} from "@leight-core/leight";
import {Result} from "antd";
import {FC, ReactNode} from "react";

export interface ILoadingPageProps extends Partial<IEmptyPageProps> {
	icon?: ReactNode;
}

export const LoadingPage: FC<ILoadingPageProps> = ({children, icon = <LoaderIcon style={{fontSize: 42}}/>, ...props}) => {
	return <EmptyPage name={"common.loading"} {...props}>
		<Result
			style={{marginTop: "10vh"}}
			icon={icon}
			children={children}
		/>
	</EmptyPage>;
};
