import {ReactNode} from "react";
import {IParams} from "../interface/interface";

export interface IMenuContext {
	/**
	 * An access to current params of the menu (read only).
	 */
	readonly params?: IParams
	/**
	 * When a menu needs generate a link, params are the way how to provide it
	 * to the menu items.
	 *
	 * If update is true, re-render will be forced. Default to false.
	 */
	setParams: (params: IParams, update?: boolean) => void
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
	 * @param name optional menu name used to prevent redraws when a same menu (by name) is used
	 */
	useMenu: (menu: ReactNode, name?: string) => void
	/**
	 * Directly set current menu.
	 *
	 * @param menu
	 */
	setMenu: (menu: ReactNode) => void
	reload: () => void
}
