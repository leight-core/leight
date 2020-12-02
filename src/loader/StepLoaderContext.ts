import {createContext, useContext} from "react";

export type IStepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface IStepLoaderContext {
	/**
	 * Current step.
	 */
	current: number
	/**
	 * Directly set current state.
	 *
	 * @param current
	 */
	setCurrent: (current: number) => void
	/**
	 * Call next step.
	 */
	next: () => void
	/**
	 * Direct access to current status.
	 */
	status: IStepStatus
	/**
	 * Set status of the current step.
	 *
	 * @param status
	 */
	setStatus: (status: IStepStatus) => void
}

/**
 * Access to Step loader context (next/prev/...).
 */
export const StepLoaderContext = createContext<IStepLoaderContext>(null);

/**
 * Access to Step loader context.
 */
export const useStepLoaderContext = () => useContext<IStepLoaderContext>(StepLoaderContext);
