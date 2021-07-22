import {SettingFilled} from "@ant-design/icons";
import {Result} from "antd";
import {FC} from "react";
import {Page} from "./Page";

export interface ILoadingPageProps {
}

export const LoadingPage: FC<ILoadingPageProps> = ({children}) => {
	return <Page>
		<Result
			style={{marginTop: "10vh"}}
			icon={<SettingFilled spin style={{fontSize: 42}}/>}
			children={children}
		/>
	</Page>;
};