import {SubmitButton} from "../../form/SubmitButton";
import {ForwardIcon} from "../../icon/ForwardIcon";
import {useModuleContext} from "../../module/ModuleContext";
import {useWizardContext} from "../WizardContext";

export const NextButton = () => {
	const moduleContext = useModuleContext();
	const wizardContext = useWizardContext();
	return (
		wizardContext.step < (wizardContext.count - 1) ?
			<SubmitButton title={moduleContext.tid("wizard.next")} noStyle icon={<ForwardIcon/>}/> :
			null
	);
};
