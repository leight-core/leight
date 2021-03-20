/**
 * Currently selected menu items, menu and other cool menu stuff.
 */
import {ReactNode} from "react";

export interface IMenuContext {
	/**
	 * Currently selected menu items.
	 */
	current: string[]
	/**
	 * An effect to select menu item.
	 *
	 * @param select
	 */
	useSelect: (select: string[]) => void
	/**
	 * Current menu.
	 */
	menu: ReactNode
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
