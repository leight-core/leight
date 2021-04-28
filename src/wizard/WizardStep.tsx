import {Divider, Typography} from "antd";
import {FC, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {ScrollToTop} from "../component/ScrollToTop";
import {useFormContext} from "../form/FormContext";
import {useWizardContext} from "./WizardContext";

export interface IWizardStepProps {
	title: string
	initials?: any
}

export const WizardStep: FC<IWizardStepProps> = ({title, initials, children}) => {
	const {t} = useTranslation();
	const formContext = useFormContext();
	const wizardContext = useWizardContext();
	useEffect(() => {
		initials && formContext.setValues(initials);
		wizardContext.values && formContext.setValues(wizardContext.values);
	}, []);
	return <>
		<ScrollToTop/>
		<Typography.Title level={2} children={t(title)}/>
		<Divider type={"horizontal"}/>
		{children}
	</>;
};
