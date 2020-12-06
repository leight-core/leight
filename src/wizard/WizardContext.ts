import {createContext} from "react";
import {IEvents} from "../utils/Events";
import {useContext} from "../utils/useContext";

export interface IWizardContext {
	/**
	 * Wizard name.
	 */
	name: string
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
	 * Values collected from form in the wizard, if any.
	 */
	values: Object
	/**
	 * Compute next step (update state).
	 */
	next: () => void
	canNext: () => boolean
	canPrevious: () => boolean
	canFinish: () => boolean
}

export const WizardContext = createContext(null as unknown as IWizardContext);

export const useWizardContext = () => useContext<IWizardContext>(WizardContext, "WizardContext", "Please use Wizard component.");
