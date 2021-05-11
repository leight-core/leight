import {SubmitButton} from "../../form/SubmitButton";
import {BackIcon} from "../../icon/BackIcon";
import {useWizardContext} from "../WizardContext";

export const PreviousButton = () => {
	const wizardContext = useWizardContext();
	return (
		<SubmitButton
			icon={<BackIcon/>}
			type={"primary"}
			size={"middle"}
			ghost
			noStyle
			disabled={!wizardContext.canPrevious()}
			onClick={() => wizardContext.events.handler("previous")(wizardContext)}
			disabledIcon={<BackIcon/>}
			label={"common.wizard.previous"}
		/>
	);
};
