import {SubmitButton} from "../../form/SubmitButton";
import {useModuleContext} from "../../module/ModuleContext";
import {useWizardContext} from "../WizardContext";

export const FinishButton = () => {
	const wizardContext = useWizardContext();
	const moduleContext = useModuleContext();
	return (
		wizardContext.step === wizardContext.count - 1 ?
			<SubmitButton label={[
				moduleContext.tid(wizardContext.name + ".wizard.finish"),
				moduleContext.tid("wizard.finish"),
				"common.wizard.finish",
			]} noStyle/> :
			null
	);
};
