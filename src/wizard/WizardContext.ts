import {createContext} from "react";
import {IEvents} from "../utils/Events";
import {useContext} from "../utils/useContext";

export interface IWizardContext {
	events: IEvents
	/**
	 * Current step number.
	 */
	step: number
	/**
	 * Total number of steps.
	 */
	count: number
	/**
	 * Compute previous step (update state).
	 */
	previous: () => void
	/**
	 * Compute next step (update state).
	 */
	next: () => void
}

export const WizardContext = createContext(null as unknown as IWizardContext);

export const useWizardContext = () => useContext<IWizardContext>(WizardContext, "WizardContext", "Please use Wizard component.");
