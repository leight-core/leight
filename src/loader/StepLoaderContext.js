import * as React from "react";
import {useContext} from "react";

/**
 * @typedef {function} StepLoaderContextSetCurrentType
 * @param {number} current
 */
/**
 * @typedef {function} StepLoaderContextSetStatusType
 * @param {string} status
 */
/**
 * @typedef {Object} StepLoaderContextType
 * @property {number} current Current step.
 * @property {StepLoaderContextSetCurrentType} setCurrent Directly set current state.
 * @property {function(): void} next Call next step.
 * @property {StepLoaderContextSetStatusType} setStatus Set status of the current step.
 * @property {string} status Direct access to current status.
 */

/**
 * Access to Step loader context (next/prev/...).
 *
 * @type {React.Context<StepLoaderContextType>}
 */
export const StepLoaderContext = React.createContext();

/**
 * Access to Step loader context.
 *
 * @return {StepLoaderContextType}
 */
export const useStepLoaderContext = () => useContext(StepLoaderContext);
