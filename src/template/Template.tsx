import {Centered, isString} from "@leight-core/leight";
import {Divider, Result, ResultProps} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface ITemplateProps extends Partial<ResultProps> {
	translation?: boolean;
	span?: number;
}

export const Template: FC<ITemplateProps> = ({icon, title, subTitle, translation = true, span = 16, children, ...props}) => {
	const {t} = useTranslation();
	return <>
		<Result
			icon={icon}
			title={(translation && isString(title)) ? t(title + ".title") : title}
			subTitle={(translation && isString(subTitle)) ? t(subTitle + ".subtitle") : subTitle}
			extra={<Divider/>}
			{...props}
		/>
		<Centered span={span}>
			{children}
		</Centered>
	</>;
};
