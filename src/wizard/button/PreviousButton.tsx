import {Button} from "antd";
import {BackIcon} from "../../icon/BackIcon";
import {useModuleContext} from "../../module/ModuleContext";
import {useWizardContext} from "../WizardContext";

export const PreviousButton = () => {
	const moduleContext = useModuleContext();
	const wizardContext = useWizardContext();
	return (wizardContext.step > 0 ? (
		<Button
			icon={<BackIcon/>}
			size={"large"}
			onClick={() => {
				wizardContext.previous();
				wizardContext.events.call("previous", wizardContext);
			}}
			children={moduleContext.t("wizard.previous")}
		/>
	) : null);
};
