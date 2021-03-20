import {ReactNode} from "react";
import {Params} from "react-router";

export interface IMenuContext {
	/**
	 * An access to current params of the menu (read only).
	 */
	readonly params?: Params
	/**
	 * When a menu needs generate a link, params are the way how to provide it
	 * to the menu items.
	 */
	setParams: (params: Params) => void
	/**
	 * Currently selected menu items.
	 */
	readonly current: string[]
	/**
	 * An effect to select menu item.
	 *
	 * @param select
	 */
	useSelect: (select: string[]) => void
	/**
	 * Current menu.
	 */
	readonly menu: ReactNode
	/**
	 * Use the selected menu
	 *
	 * @param menu use the given menu
	 * @param deps
	 */
	useMenu: (menu: ReactNode) => void
	/**
	 * Directly set current menu.
	 *
	 * @param menu
	 */
	setMenu: (menu: ReactNode) => void
}
