import {SubmitButton} from "../../form/SubmitButton";
import {SubmitIcon} from "../../icon/SubmitIcon";
import {useModuleContext} from "../../module/ModuleContext";
import {useWizardContext} from "../WizardContext";

export const FinishButton = () => {
	const wizardContext = useWizardContext();
	const moduleContext = useModuleContext();
	return (
		<SubmitButton
			label={[
				moduleContext.tid(wizardContext.name + ".wizard.finish"),
				moduleContext.tid("wizard.finish"),
				"common.wizard.finish",
			]}
			size={"large"}
			icon={<SubmitIcon/>}
			noStyle
		/>
	);
};
