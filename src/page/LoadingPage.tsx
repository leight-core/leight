import {SettingFilled} from "@ant-design/icons";
import {Result} from "antd";
import {FC, ReactNode} from "react";
import {EmptyPage, IEmptyPageProps} from "./EmptyPage";

export interface ILoadingPageProps extends Partial<IEmptyPageProps> {
	icon?: ReactNode;
}

export const LoadingPage: FC<ILoadingPageProps> = ({children, icon = <SettingFilled spin style={{fontSize: 42}}/>, ...props}) => {
	return <EmptyPage name={"common.loading"} {...props}>
		<Result
			style={{marginTop: "10vh"}}
			icon={icon}
			children={children}
		/>
	</EmptyPage>;
};
