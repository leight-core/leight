import React, {FC} from "react";
import {LoaderIcon} from "./LoaderIcon";

export interface ISpinner {
	done: boolean,
}

/**
 * Spinner is simple placeholder component - until truthy "done" is not true, spinner icon is shown.
 * When true, children prop is rendered.
 */
export const Spinner: FC<ISpinner> = (
	{
		done,
		children
	}) => {
	return (done ? <>{children}</> : <LoaderIcon spin/>);
};
