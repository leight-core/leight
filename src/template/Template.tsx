import {Centered} from "@leight-core/leight";
import {Divider, Result} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface ITemplate {
	title: string;
	icon: ReactNode;
}

export const Template: FC<ITemplate> = ({icon, title, children}) => {
	const {t} = useTranslation();
	return <>
		<Result
			icon={icon}
			title={t(title + ".title")}
			subTitle={t(title + ".subtitle")}
			extra={<Divider/>}
		/>
		<Centered span={16}>
			{children}
		</Centered>
	</>;
};
