import {Steps} from "antd";
import React, {FC, useEffect, useState} from "react";
import {Spinner} from "../icon/Spinner";
import {useStepLoaderContext} from "./StepLoaderContext";

export interface ILoaderStep {
	/**
	 * What to do when step should be executed; it could return cleanup function used in `useEffect()`.
	 */
	onStep: () => (void | (() => void | undefined))
	/**
	 * Prop set by controlling `Steps` component.
	 */
	active?: boolean
	/**
	 * Step icon.
	 */
	icon: JSX.Element
}

/**
 * Step implementation - when active, an action (onStep) is executed.
 */
export const LoaderStep: FC<ILoaderStep> = (
	{
		onStep,
		icon,
		...props
	}
) => {
	const [loading, setLoading] = useState(false);
	const stepLoaderContext = useStepLoaderContext();
	useEffect(() => {
		setLoading(props.active);
		if (props.active) {
			return onStep();
		}
	}, [props.active]);
	return (
		<Steps.Step
			{...props}
			icon={<Spinner done={!loading || stepLoaderContext.status === "error"} children={icon}/>}
		/>
	);
};
