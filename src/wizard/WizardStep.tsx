import {Divider, Typography} from "antd";
import {FC, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {ScrollToTop} from "../component/ScrollToTop";
import {useFormContext} from "../form/FormContext";
import {useWizardContext} from "./WizardContext";

export interface IWizardStepProps {
	title?: string;
	initials?: any;
	showTitle?: boolean;
}

export const WizardStep: FC<IWizardStepProps> = ({title, initials, showTitle = false, children}) => {
	const {t} = useTranslation();
	const formContext = useFormContext();
	const wizardContext = useWizardContext();

	useEffect(() => {
		initials && formContext.setValues(initials);
	}, [initials]);

	useEffect(() => {
		wizardContext.values && formContext.setValues(wizardContext.values);
	}, [wizardContext.values]);

	return <>
		<ScrollToTop/>
		{showTitle && title && <>
			<Typography.Title level={4}>
				{t(title)}
			</Typography.Title>
			<Divider type={"horizontal"}/>
		</>}
		{children}
	</>;
};
