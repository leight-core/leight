import {Space, SpaceProps, Tooltip} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IIconTextProps extends Partial<SpaceProps> {
	icon: ReactNode;
	text?: string | number;
	tooltip?: string;
}

export const IconText: FC<IIconTextProps> = ({icon, text, tooltip, ...props}) => {
	const {t} = useTranslation();
	return tooltip ?
		<Tooltip title={t(tooltip)}>
			<Space {...props}>
				{icon}
				<>{text && t("" + text)}</>
			</Space>
		</Tooltip> :
		<Space {...props}>
			{icon}
			<>{text && t("" + text)}</>
		</Space>;
};
