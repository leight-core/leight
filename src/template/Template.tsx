import {Centered} from "@leight-core/leight";
import {Divider, Result} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface ITemplateProps {
	title: string;
	icon: ReactNode;
	translation?: boolean;
}

export const Template: FC<ITemplateProps> = ({icon, title, translation = true, children}) => {
	const {t} = useTranslation();
	return <>
		<Result
			icon={icon}
			title={translation ? t(title + ".title") : title}
			subTitle={translation ? t(title + ".subtitle") : null}
			extra={<Divider/>}
		/>
		<Centered span={16}>
			{children}
		</Centered>
	</>;
};
