import {useFormContext} from "../../form/FormContext";
import {FormSubmitButton} from "../../form/FormSubmitButton";
import {SubmitIcon} from "../../icon/SubmitIcon";
import {useModuleContext} from "../../module/ModuleContext";
import {IWizardFinish} from "../interface";
import {useWizardContext} from "../WizardContext";

export const FinishButton = () => {
	const wizardContext = useWizardContext();
	const moduleContext = useModuleContext();
	const formContext = useFormContext();
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
				const values = formContext.form.getFieldsValue();
				wizardContext.events
					.call("next", {values})
					.call<IWizardFinish>("finish", {
						wizardContext,
						values: wizardContext.outputMapper(wizardContext.merge(wizardContext.values, values))
					});
			}}
			noStyle
		/>
	);
};
