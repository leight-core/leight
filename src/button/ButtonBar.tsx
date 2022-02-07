import {Centered} from "@leight-core/leight";
import {Divider, Space} from "antd";
import {FC} from "react";
import {isBrowser} from "react-device-detect";

export interface IButtonBarProps {
	inline?: boolean;
}

export const ButtonBar: FC<IButtonBarProps> = ({inline = true, children}) => {
	return <Centered>
		<Space
			size={"small"}
			align={"center"}
			direction={(isBrowser && inline) ? "horizontal" : "vertical"}
			split={(isBrowser && inline) ? <Divider type={"vertical"}/> : null}
		>
			{children}
		</Space>
	</Centered>;
};
