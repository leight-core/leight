import {useFormContext} from "../../form/FormContext";
import {FormSubmitButton} from "../../form/FormSubmitButton";
import {SubmitIcon} from "../../icon/SubmitIcon";
import {useWizardContext} from "../WizardContext";

export const FinishButton = () => {
	const wizardContext = useWizardContext();
	const formContext = useFormContext();
	const {events} = wizardContext;
	return (
		<FormSubmitButton
			label={[
				"wizard." + wizardContext.name + ".wizard.finish",
				"common.wizard.finish",
			]}
			size={"large"}
			icon={<SubmitIcon/>}
			onClick={() => {
				const values = formContext.values();
				events.handler("finish")({
					wizardContext,
					values: wizardContext.outputMapper<any>(wizardContext.merge(wizardContext.values, values))
				});
			}}
			noStyle
		/>
	);
};
