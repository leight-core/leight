import {SettingFilled} from "@ant-design/icons";
import {Result} from "antd";
import {FC} from "react";
import {EmptyPage, IEmptyPageProps} from "./EmptyPage";

export interface ILoadingPageProps extends Partial<IEmptyPageProps> {
}

export const LoadingPage: FC<ILoadingPageProps> = ({children, ...props}) => {
	return <EmptyPage name={"common.loading"} {...props}>
		<Result
			style={{marginTop: "10vh"}}
			icon={<SettingFilled spin style={{fontSize: 42}}/>}
			children={children}
		/>
	</EmptyPage>;
};
