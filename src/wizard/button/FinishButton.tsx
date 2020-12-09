import {useOptionalFormContext} from "../../form/FormContext";
import {FormSubmitButton} from "../../form/FormSubmitButton";
import {SubmitIcon} from "../../icon/SubmitIcon";
import {useModuleContext} from "../../module/ModuleContext";
import {useWizardContext} from "../WizardContext";

export const FinishButton = () => {
	const wizardContext = useWizardContext();
	const moduleContext = useModuleContext();
	const formContext = useOptionalFormContext();
	return (
		<FormSubmitButton
			label={[
				moduleContext.tid(wizardContext.name + ".wizard.finish"),
				moduleContext.tid("wizard.finish"),
				"common.wizard.finish",
			]}
			size={"large"}
			icon={<SubmitIcon/>}
			onClick={() => {
				const values = formContext ? formContext.form.getFieldsValue() : {};
				wizardContext.events
					.call("next", {values})
					.call("finish", {values: wizardContext.values, ...values});
			}}
			noStyle
		/>
	);
};
