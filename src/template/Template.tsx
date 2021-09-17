import {Centered, isString} from "@leight-core/leight";
import {Divider, Result} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface ITemplateProps {
	title: ReactNode;
	subTitle?: ReactNode;
	icon: ReactNode;
	translation?: boolean;
	span?: number;
}

export const Template: FC<ITemplateProps> = ({icon, title, subTitle, translation = true, span = 16, children}) => {
	const {t} = useTranslation();
	return <>
		<Result
			icon={icon}
			title={(translation && isString(title)) ? t(title + ".title") : title}
			subTitle={(translation && isString(subTitle)) ? t(subTitle + ".subtitle") : subTitle}
			extra={<Divider/>}
		/>
		<Centered span={span}>
			{children}
		</Centered>
	</>;
};
