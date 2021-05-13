import {useFormContext} from "../../form/FormContext";
import {SubmitButton} from "../../form/SubmitButton";
import {ForwardIcon} from "../../icon/ForwardIcon";
import {useWizardButtonContext} from "../useWizardButtonContext";
import {useWizardContext} from "../WizardContext";

export const NextButton = () => {
	const wizardContext = useWizardContext();
	const buttonContext = useWizardButtonContext();
	const formContext = useFormContext();
	return (
		<SubmitButton
			label={"common.wizard.next"}
			size={"large"}
			disabled={buttonContext.isDisabled("next")}
			noStyle
			icon={<ForwardIcon/>}
			onClick={() => wizardContext.events.handler("next")({wizardContext, values: formContext.form.getFieldsValue()})}
		/>
	);
};
