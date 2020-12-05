import {Button} from "antd";
import {BackIcon} from "../../icon/BackIcon";
import {useWizardContext} from "../WizardContext";

export const PreviousButton = () => {
	const wizardContext = useWizardContext();
	return (wizardContext.step > 0 ? (
		<Button
			icon={<BackIcon/>}
			size={"large"}
			onClick={() => {
				wizardContext.previous();
				wizardContext.events.call("previous", wizardContext);
			}}
			children={"common.wizard.previous"}
		/>
	) : null);
};
