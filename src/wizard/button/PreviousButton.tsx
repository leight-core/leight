import {SubmitButton} from "../../form/SubmitButton";
import {BackIcon} from "../../icon/BackIcon";
import {useWizardContext} from "../WizardContext";

export const PreviousButton = () => {
	const wizardContext = useWizardContext();
	return (
		<SubmitButton
			icon={<BackIcon/>}
			size={"small"}
			noStyle
			disabled={!wizardContext.canPrevious()}
			onClick={() => {
				wizardContext.previous();
				wizardContext.events.call("previous", wizardContext);
			}}
			disabledIcon={<BackIcon/>}
			label={"common.wizard.previous"}
		/>
	);
};
