import {Centered} from "@leight-core/leight";
import {Space, SpaceProps} from "antd";
import {FC} from "react";
import {isBrowser} from "react-device-detect";

export interface IButtonBarProps extends Partial<SpaceProps> {
	inline?: boolean;
}

export const ButtonBar: FC<IButtonBarProps> = ({inline = true, ...props}) => {
	return <Centered>
		<Space
			size={0}
			align={"center"}
			direction={(isBrowser || inline) ? "horizontal" : "vertical"}
			{...props}
		/>
	</Centered>;
};
