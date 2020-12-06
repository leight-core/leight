import {useOptionalFormContext} from "../../form/FormContext";
import {SubmitButton} from "../../form/SubmitButton";
import {ForwardIcon} from "../../icon/ForwardIcon";
import {useWizardContext} from "../WizardContext";

export const NextButton = () => {
	const wizardContext = useWizardContext();
	const formContext = useOptionalFormContext();
	return (
		<SubmitButton
			label={"common.wizard.next"}
			size={"large"}
			noStyle
			icon={<ForwardIcon/>}
			onClick={() => {
				wizardContext.next();
				wizardContext.events.call("next", {wizardContext, values: formContext ? formContext.form.getFieldsValue() : {}});
			}}
		/>
	);
};
