import {Events} from "../utils/Events";
import {IWizardEventHandlers, IWizardEvents, IWizardEventTypes} from "./interface";

export const WizardEvents = (): IWizardEvents => {
	return Events<IWizardEventTypes, IWizardEventHandlers>();
};
