import {Space, SpaceProps} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IIconTextProps extends Partial<SpaceProps> {
	icon: ReactNode;
	text: string;
}

export const IconText: FC<IIconTextProps> = ({icon, text, ...props}) => {
	const {t} = useTranslation();
	return <Space {...props}>
		{icon}
		{t(text)}
	</Space>;
};
