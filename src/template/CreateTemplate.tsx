import {Centered} from "@leight-core/leight";
import {Divider, Result} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface ICreateTemplateProps {
	title: string;
	icon: ReactNode;
}

export const CreateTemplate: FC<ICreateTemplateProps> = ({icon, title, children}) => {
	const {t} = useTranslation();
	return <Result
		icon={icon}
		title={t(title + ".create.title")}
		subTitle={t(title + ".create.subtitle")}
		extra={<>
			<Divider/>
			<Centered span={16}>
				{children}
			</Centered>
		</>}
	/>;
};
