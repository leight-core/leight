import {Centered} from "@leight-core/leight";
import {Divider, Result, ResultProps} from "antd";
import {FC} from "react";
import {isBrowser} from "react-device-detect";
import {useTranslation} from "react-i18next";

export interface ITemplateProps extends Partial<ResultProps> {
	label?: string;
	span?: number;
	forMobile?: boolean;
}

export const Template: FC<ITemplateProps> = ({icon, label, title, subTitle, span = 16, forMobile = false, children, ...props}) => {
	const {t} = useTranslation();
	return <>
		{(isBrowser || forMobile) && <Result
			icon={icon}
			title={(title || title === false) ? title : (label ? t(label + ".title") : label)}
			subTitle={(subTitle || subTitle === false) ? subTitle : (label ? t(label + ".subtitle") : label)}
			extra={<Divider/>}
			{...props}
		/>}
		{isBrowser ? <Centered span={span}>
			{children}
		</Centered> : children}
	</>;
};
