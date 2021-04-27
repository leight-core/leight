import {Divider, Typography} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {ScrollToTop} from "../component/ScrollToTop";

export interface IWizardStepProps {
	title: string
}

export const WizardStep: FC<IWizardStepProps> = ({title, children}) => {
	const {t} = useTranslation();
	return <>
		<ScrollToTop/>
		<Typography.Title level={2} children={t(title)}/>
		<Divider type={"horizontal"}/>
		{children}
	</>;
};
