import {IDeepMerge, IOutputMapper} from "../interface/interface";
import {IEvents} from "../utils/Events";

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
	 * Values collected from form in the wizard, if any.
	 */
	values: Object
	/**
	 * Compute previous step (update state).
	 */
	previous: () => void
	/**
	 * Compute next step (update state).
	 */
	next: () => void
	canNext: () => boolean
	canPrevious: () => boolean
	canFinish: () => boolean
	/**
	 * Set or get data a wizard might depend on (for example when Wizard prefetches some data required by a component in later step to
	 * ensure the wizard has all the data).
	 *
	 * @param name
	 * @param values
	 */
	dependency: <T = any>(name: string, value?: T) => any
	/**
	 * Map values on output (on finish); intermediate values are **not** mapped by this function!
	 *
	 * @param values
	 */
	outputMapper: IOutputMapper
	merge: IDeepMerge
}

export interface IStep {
	id: string
	component: JSX.Element
}
