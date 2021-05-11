import {useEffect} from "react";
import {IWizardEvents} from "./interface";

/**
 * Helper hook used to bind events just when they're changed on the step (to prevent some silly bugs).
 */
export const useStepEvents = (events: IWizardEvents, callback: (events: IWizardEvents) => void) => {
	useEffect(() => {
		callback(events);
	}, [events]);
};
