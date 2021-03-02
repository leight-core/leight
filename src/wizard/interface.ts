import {IDeepMerge, IOutputMapper} from "../interface/interface";
import {IEventHandler, IEvents} from "../utils/interface";

export interface IWizardContext {
	/**
	 * Wizard name.
	 */
	name: string
	/**
	 * Events available in the wizard context.
	 */
	events: IWizardEvents
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
	dependencies: Object
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

export interface IWizardStep {
	id: string
	component: JSX.Element
}

export interface IWizardNext<TValues extends Object = any> {
	wizardContext: IWizardContext
	values: TValues
}

export interface IWizardFinish<TValues extends Object = any> {
	wizardContext: IWizardContext
	values: TValues
}

export type IWizardEventTypes = "reset" | "next" | "previous" | "finish";

export interface IWizardEventHandlers extends IEventHandler<IWizardEventTypes> {
	reset: () => void
	next: (wizardNext: IWizardNext) => void
	previous: (wizardContext: IWizardContext) => void
	finish: (wizardFinish: IWizardFinish) => void
}

export interface IWizardEvents extends IEvents<IWizardEventTypes, IWizardEventHandlers> {
}
