import {SubmitButton} from "../../form/SubmitButton";
import {BackIcon} from "../../icon/BackIcon";
import {useWizardButtonContext} from "../useWizardButtonContext";
import {useWizardContext} from "../WizardContext";

export const PreviousButton = () => {
	const wizardContext = useWizardContext();
	const buttonContext = useWizardButtonContext();
	return (
		<SubmitButton
			icon={<BackIcon/>}
			type={"primary"}
			size={"middle"}
			ghost
			noStyle
			disabled={!(wizardContext.canPrevious() && !buttonContext.isDisabled("previous"))}
			onClick={() => wizardContext.events.handler("previous")(wizardContext)}
			disabledIcon={<BackIcon/>}
			label={"common.wizard.previous"}
		/>
	);
};
