import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {IStepLoaderContext} from "./interface";

/**
 * Access to Step loader context (next/prev/...).
 */
export const StepLoaderContext = createContext<IStepLoaderContext>(null as unknown as IStepLoaderContext);

/**
 * Access to Step loader context.
 */
export const useStepLoaderContext = () => useContext<IStepLoaderContext>(StepLoaderContext, "StepLoaderContext", "Use StepLoader component or provide context by hand.");
