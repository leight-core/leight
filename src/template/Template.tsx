import {Centered} from "@leight-core/leight";
import {Result, ResultProps} from "antd";
import {FC, ReactNode} from "react";
import {isBrowser} from "react-device-detect";
import {useTranslation} from "react-i18next";

export interface ITemplateProps extends Partial<ResultProps> {
	label?: string;
	span?: number;
	forceIcon?: boolean;
	isMobile?: boolean;
	browserExtra?: ReactNode;
	mobileExtra?: ReactNode;
}

export const Template: FC<ITemplateProps> = ({icon, forceIcon = false, browserExtra, mobileExtra, label, title, subTitle, span = 16, isMobile = true, children, ...props}) => {
	const {t} = useTranslation();
	return <>
		{(isBrowser || isMobile) && <Result
			style={{padding: 0}}
			icon={(isBrowser || forceIcon) ? icon : <></>}
			title={(title || title === false) ? title : (label ? t(label + ".title") : label)}
			subTitle={(subTitle || subTitle === false) ? subTitle : (label ? t(label + ".subtitle") : label)}
			extra={isBrowser ? browserExtra : mobileExtra}
			{...props}
		/>}
		{isBrowser ? <Centered span={span}>
			{children}
		</Centered> : children}
	</>;
};
