import {Centered} from "@leight-core/leight";
import {Divider, Result, ResultProps} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface ITemplateProps extends Partial<ResultProps> {
	label?: string;
	span?: number;
}

export const Template: FC<ITemplateProps> = ({icon, label, title, subTitle, span = 16, children, ...props}) => {
	const {t} = useTranslation();
	return <>
		<Result
			icon={icon}
			title={(title || title === false) ? title : (label ? t(label + ".title") : label)}
			subTitle={(subTitle || subTitle === false) ? subTitle : (label ? t(label + ".subtitle") : label)}
			extra={<Divider/>}
			{...props}
		/>
		<Centered span={span}>
			{children}
		</Centered>
	</>;
};
