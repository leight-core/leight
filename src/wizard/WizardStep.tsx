import {Divider} from "antd";
import {FC} from "react";
import {ScrollToTop} from "../component/ScrollToTop";
import {useModuleContext} from "../module/ModuleContext";

export interface IWizardStepProps {
	title: string
}

export const WizardStep: FC<IWizardStepProps> = ({title, children}) => {
	const moduleContext = useModuleContext();
	return (
		<>
			<ScrollToTop/>
			<h2>{moduleContext.t(title)}</h2>
			<Divider type={"horizontal"}/>
			{children}
		</>
	);
};
