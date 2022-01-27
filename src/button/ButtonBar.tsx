import {Centered} from "@leight-core/leight";
import {Divider, Space} from "antd";
import {FC} from "react";
import {isMobile} from "react-device-detect";

export interface IButtonBarProps {
}

export const ButtonBar: FC<IButtonBarProps> = ({children}) => {
	return <Centered>
		<Space
			align={"center"}
			direction={isMobile ? "vertical" : "horizontal"}
			split={isMobile ? null : <Divider type={"vertical"}/>}
		>
			{children}
		</Space>
	</Centered>;
};
