import {Divider} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {ScrollToTop} from "../component/ScrollToTop";

export interface IWizardStepProps {
	title: string
}

export const WizardStep: FC<IWizardStepProps> = ({title, children}) => {
	const {t} = useTranslation();
	return (
		<>
			<ScrollToTop/>
			<h2>{t(title)}</h2>
			<Divider type={"horizontal"}/>
			{children}
		</>
	);
};
