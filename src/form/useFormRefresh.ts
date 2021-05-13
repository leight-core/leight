import {DependencyList, useEffect} from "react";
import {useFormContext} from "./FormContext";

/**
 * Just a hook used to execute form refresh in an effect.
 */
export const useFormRefresh = (deps: DependencyList = []) => {
	const formContext = useFormContext();
	useEffect(() => {
		formContext.refresh();
	}, deps);
};
