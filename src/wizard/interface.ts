import {ReactNode} from "react";
import {IEventHandlers, IEventResult, IEvents} from "../event/interface";
import {IDeepMerge, IOutputMapper} from "../interface/interface";

export type IWizardButton = "previous" | "next" | "finish" | "cancel";

export interface IWizardContext<TValues = any> {
	/**
	 * Wizard name.
	 */
	readonly name: string;
	/**
	 * Events available in the wizard context.
	 */
	readonly events: IWizardEvents;
	/**
	 * Current step number.
	 */
	readonly step: number;
	/**
	 * Total number of steps.
	 */
	readonly count: number;
	/**
	 * Values collected from form in the wizard, if any.
	 */
	readonly values: TValues;
	/**
	 * Compute previous step (update state).
	 */
	previous: () => void;
	/**
	 * Compute next step (update state).
	 */
	next: (values?: any) => void;
	canNext: () => boolean;
	canPrevious: () => boolean;
	canFinish: () => boolean;
	/**
	 * Map values on output (on finish); intermediate values are **not** mapped by this function!
	 *
	 * @param values
	 */
	readonly outputMapper: IOutputMapper;
	readonly merge: IDeepMerge;
	/**
	 * Useful hook when one step contains a dynamic form which needs to be refilled when rendered.
	 */
	useRefreshForm: () => (initials?: any, current?: any) => void;
}

export interface IWizardStep {
	id: string;
	component: (wizardEvents: IWizardEvents) => ReactNode;
}

export interface IWizardFirst<TValues extends Object = any> {
	wizardContext: IWizardContext;
	values: TValues;
}

export interface IWizardNext<TValues extends Object = any> {
	wizardContext: IWizardContext;
	values: TValues;
}

export interface IWizardFinish<TValues extends Object = any> {
	wizardContext: IWizardContext;
	values: TValues;
}

export type IWizardEventTypes = "reset" | "next" | "previous" | "finish" | "first";

export interface IWizardEventHandlers extends IEventHandlers {
	reset: () => IEventResult;
	next: (wizardNext: IWizardNext) => IEventResult;
	previous: (wizardContext: IWizardContext) => IEventResult;
	first: (wizardFirst: IWizardFirst) => IEventResult;
	finish: (wizardFinish: IWizardFinish) => IEventResult;
}

export interface IWizardEvents extends IEvents<IWizardEventTypes, IWizardEventHandlers> {
}
