import {DependencyList} from "react";

export type IButtonIndex<TButtons extends string> = {
	[index in TButtons]: boolean
}

export interface IButtonContext<TButtons extends string> {
	/**
	 * Enable/disable the selected Wizard button.
	 *
	 * @param button
	 * @param disable
	 */
	disable: (button: TButtons, disable?: boolean) => void
	enable: (button: TButtons, enable?: boolean) => void
	/**
	 * Tells if the given button is disabled.
	 *
	 * @param button
	 */
	isDisabled: (button: TButtons) => boolean,
	/**
	 * Disable button using an effect.
	 *
	 * @param button
	 * @param disable
	 */
	useDisable: (button: TButtons, disable?: boolean, deps?: DependencyList) => void
	useEnable: (button: TButtons, enable?: boolean, deps?: DependencyList) => void
}
