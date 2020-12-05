import {SubmitButton} from "../../form/SubmitButton";
import {ForwardIcon} from "../../icon/ForwardIcon";
import {useWizardContext} from "../WizardContext";

export const NextButton = () => {
	const wizardContext = useWizardContext();
	return (
		wizardContext.step < (wizardContext.count - 1) ?
			<SubmitButton label={"common.wizard.next"} noStyle icon={<ForwardIcon/>}/> :
			null
	);
};
