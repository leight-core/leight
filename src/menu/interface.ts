import {ReactNode} from "react";

export interface IMenuContext {
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
	readonly menu: ReactNode;
	/**
	 * Use the selected menu
	 *
	 * @param menu use the given menu
	 * @param name optional menu name used to prevent redraws when a same menu (by name) is used
	 */
	useMenu: (menu?: ReactNode, name?: string) => void;
	/**
	 * Directly set current menu.
	 *
	 * @param menu
	 */
	setMenu: (menu: ReactNode) => void;
}
